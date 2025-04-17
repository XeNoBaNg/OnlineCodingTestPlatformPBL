import express from 'express'
import pool from '../database.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'
import jwt from 'jsonwebtoken'
import authenticate from '../middleware/authenticate.js'

const router = express.Router()
dotenv.config()

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.post('/admin/login', async (req, res) => {
    const { email, password } = req.body

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email])

    if (user.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' })
    }

    const admin = user.rows[0]

    if (admin.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied: Not an admin' })
    }

    const isValidPassword = await bcrypt.compare(password, admin.password_hash)
    if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.json({
        message: 'Admin login successful',
        token,
        admin: {
            id: admin.id,
            username: admin.username,
            email: admin.email,
            role: admin.role
        }
    })
})

router.post('/student/register', async (req, res) => {
    try {
        const { name, regid, email, password } = req.body
        const id = uuidv4()

        if (!name || !regid || !email || !password) {
            return res.status(400).json({ message: "Send all required fields." })
        }

        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email = $1 OR regid = $2",
            [email, regid]
        )
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "User already exists." })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await pool.query(
            "INSERT INTO users (id, username, regid, email, password_hash, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [id, name, regid, email, hashedPassword, "student"]
        )

        res.status(201).json({ message: "Student registered successfully!", user: newUser.rows[0] })

    } catch (error) {
        console.log(error.message)
        res.status(500).send({message:error.message})
    }

})

router.post('/student/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Send all required fields." })
        }

        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email])

        if (user.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' })
        }

        const student = user.rows[0]

        const isValidPassword = await bcrypt.compare(password, student.password_hash)
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid email or password' })
        }

        const token = jwt.sign({ id: student.id, role: student.role }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.json({
            message: 'Student login successful',
            token,
            student: {
                id: student.id,
                name: student.username,
                regid: student.regid,
                email: student.email,
                role: student.role
            }
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

router.post("/admin/addtest", async (req, res) => {
    try {
        const { title, description, start_time, end_time, questions } = req.body
        const created_by = "bc392540-3948-408e-a2e4-5234b833756d"

        if (!title || !description || !start_time || !end_time || !questions || questions.length === 0) {
            return res.status(400).json({ message: "All fields and at least one question are required" })
        }

        const client = await pool.connect()

        try {
            await client.query("BEGIN")

            const testResult = await client.query(
                "INSERT INTO tests (title, description, start_time, end_time, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING id",
                [title, description, start_time, end_time, created_by]
            )
            const test_id = testResult.rows[0].id

            const questionPromises = questions.map(({ title, description, difficulty, test_cases, max_score }) => {
                return client.query(
                    "INSERT INTO questions (test_id, title, description, difficulty, test_cases, max_score) VALUES ($1, $2, $3, $4, $5, $6)",
                    [test_id, title, description, difficulty, JSON.stringify(test_cases), max_score]
                )
            })

            await Promise.all(questionPromises)

            await client.query("COMMIT")
            res.status(201).json({ message: "Test and questions added successfully", test_id })
        } catch (error) {
            await client.query("ROLLBACK")
            console.error("Transaction Error:", error.message)
            res.status(500).json({ message: "Failed to add test and questions" })
        } finally {
            client.release()
        }
    } catch (error) {
        console.error("Server Error:", error.message)
        res.status(500).json({ message: "Server error" })
    }
})

router.get("/tests", async (req, res) => {
    try {
        const tests = await pool.query("SELECT * FROM tests"); 
        res.json(tests.rows);
    } catch (error) {
        console.error("Error fetching tests:", error)
        res.status(500).json({ error: "Server error" })
    }
})

router.get('/student/tests/:id', async (req, res) => {
    const { id } = req.params
    const test = await pool.query('SELECT * FROM tests WHERE id = $1', [id])
    if (!test.rows.length) {
        return res.status(404).json({ error: "Test not found" })
    }
    res.json(test.rows)
})

router.get('/student/tests/:id/questions', async (req, res) => {
    const { id } = req.params
    try {
        const questions = await pool.query('SELECT * FROM questions WHERE test_id = $1', [id])
        res.json(questions.rows)
    } catch (error) {
        console.error("Error fetching questions:", error)
        res.status(500).json({ error: "Server error" })
    }
})

router.get('/profile', authenticate, async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized: Missing user ID' })
        }

        const userId = req.user.id
        const result = await pool.query(
            'SELECT id, username, regid, email, role, created_at FROM users WHERE id = $1',
            [userId]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.json(result.rows[0])
    } catch (error) {
        console.error("Error fetching profile:", error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

router.post("/submit", async (req, res) => {
    const { user_id, question_id, language, code } = req.body

    if (!user_id || !question_id || !language || !code) {
        return res.status(400).json({ message: "Missing required fields" })
    }

    try {
        const submission = await pool.query(
            `INSERT INTO submissions (user_id, question_id, language, code, status) 
             VALUES ($1, $2, $3, $4, 'Pending') RETURNING id`,
            [user_id, question_id, language, code]
        )

        const submissionId = submission.rows[0].id

        const question = await pool.query("SELECT test_cases, max_score FROM questions WHERE id = $1", [question_id])

        if (!question.rows.length) {
            return res.status(400).json({ message: "Invalid question ID" })
        }

        const { test_cases, max_score } = question.rows[0]
        const languageId = getLanguageId(language)

        const parsedTestCases = JSON.parse(test_cases)
        const expectedOutput = parsedTestCases[0]?.expected_output?.trim() || "" // Extract and trim expected output

        const encodedSourceCode = Buffer.from(code).toString("base64")
        const encodedStdin = Buffer.from(parsedTestCases[0]?.input || "").toString("base64") // Input is also base64 encoded

        const judgeResponse = await axios.post(
            "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false",
            { language_id: languageId, source_code: encodedSourceCode, stdin: encodedStdin },
            { headers: { "X-RapidAPI-Key": process.env.RAPIDAPI_KEY, "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com" } }
        )

        const token = judgeResponse.data.token

        let result
        while (true) {
            const response = await axios.get(
                `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true`,
                { headers: { "X-RapidAPI-Key": process.env.RAPIDAPI_KEY, "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com" } }
            )

            result = response.data
            console.log("Judge0 Response:", result)

            if (result.status.id > 2) break

            await new Promise(resolve => setTimeout(resolve, 2000))
        }

        const output = result.stdout ? Buffer.from(result.stdout, "base64").toString().trim() : null

        console.log("Output:", output)
        console.log("Expected Output:", expectedOutput)

        const isCorrect = output && expectedOutput && output === expectedOutput

        let status = "Wrong Answer"
        let score = 0

        if (result.status.id === 3) {
            status = isCorrect ? "Accepted" : "Wrong Answer"
            score = isCorrect ? max_score : 0
        } else if (result.status.id === 4) status = "Compilation Error"
        else if (result.status.id === 5) status = "Runtime Error"

        await pool.query(
            `UPDATE submissions SET status = $1, score = $2, execution_time = $3, memory_used = $4 WHERE id = $5`,
            [status, score, result.time || 0, result.memory || 0, submissionId]
        )

        res.json({ status, score, execution_time: result.time, memory_used: result.memory })
    } catch (error) {
        console.error("Error processing submission:", error)
        res.status(500).json({ message: "Server error" })
    }
})

const getLanguageId = (language) => {
    const mapping = { javascript: 63, python: 71, cpp: 54 }
    return mapping[language] || 71
}


// Add this to your existing route file
router.get('/leaderboard/:test_id', async (req, res) => {
    try {
        const { test_id } = req.params;
        
        // Query to get scores for each user in this test
        const leaderboardQuery = `
            SELECT 
                u.id,
                u.username,
                u.regid,
                COALESCE(SUM(s.score), 0) as total_score
            FROM 
                users u
            LEFT JOIN (
                SELECT 
                    user_id,
                    question_id,
                    MAX(score) as score
                FROM 
                    submissions
                WHERE 
                    question_id IN (SELECT id FROM questions WHERE test_id = $1)
                GROUP BY 
                    user_id, question_id
            ) s ON u.id = s.user_id
            WHERE 
                u.role = 'student'
                AND EXISTS (
                    SELECT 1 FROM submissions 
                    WHERE user_id = u.id 
                    AND question_id IN (SELECT id FROM questions WHERE test_id = $1)
                )
            GROUP BY 
                u.id, u.username, u.regid
            ORDER BY 
                total_score DESC
        `;
        
        const result = await pool.query(leaderboardQuery, [test_id]);
        
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Also add a general leaderboard endpoint that combines all tests
router.get('/leaderboard', async (req, res) => {
    try {
        // Query to get total scores across all tests for each user
        const leaderboardQuery = `
            SELECT 
                u.id,
                u.username,
                u.regid,
                COALESCE(SUM(s.score), 0) as total_score
            FROM 
                users u
            LEFT JOIN (
                SELECT 
                    user_id,
                    question_id,
                    MAX(score) as score
                FROM 
                    submissions
                GROUP BY 
                    user_id, question_id
            ) s ON u.id = s.user_id
            WHERE 
                u.role = 'student'
                AND EXISTS (
                    SELECT 1 FROM submissions WHERE user_id = u.id
                )
            GROUP BY 
                u.id, u.username, u.regid
            ORDER BY 
                total_score DESC
        `;
        
        const result = await pool.query(leaderboardQuery);
        
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching overall leaderboard:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Add this to your routes file
router.get('/student/submissions/:userId/:testId/scores', async (req, res) => {
    try {
        const { userId, testId } = req.params;
        
        // Query to calculate the highest score for each question in the test
        const scoresQuery = `
            SELECT 
                q.id as question_id,
                q.max_score,
                COALESCE(MAX(s.score), 0) as best_score
            FROM 
                questions q
            LEFT JOIN 
                submissions s ON q.id = s.question_id AND s.user_id = $1
            WHERE 
                q.test_id = $2
            GROUP BY 
                q.id, q.max_score
        `;
        
        const result = await pool.query(scoresQuery, [userId, testId]);
        
        // Calculate total score
        const totalScore = result.rows.reduce((sum, item) => sum + Number(item.best_score), 0);
        const maxPossibleScore = result.rows.reduce((sum, item) => sum + Number(item.max_score), 0);
        
        res.json({
            questions: result.rows,
            total_score: totalScore,
            max_possible_score: maxPossibleScore
        });
    } catch (error) {
        console.error("Error fetching student scores:", error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router