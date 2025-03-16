import express from 'express'
import pool from '../database.js'
import bcrypt from 'bcrypt'
import {v4 as uuidv4} from 'uuid'

const router = express.Router()

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

    if (admin.role != 'admin') {
        return res.status(403).json({ error: 'Access denied: Not an admin' })
    }

    const isValidPassword = await bcrypt.compare(password, admin.password_hash);

    if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid email or password' })
    }

    res.json({
        message: 'Admin login successful',
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
        const id = uuidv4()

        if ( !email || !password) {
            return res.status(400).json({ message: "Send all required fields." })
        }

        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email])

        if (user.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' })
        }

        const student = user.rows[0]

        const isValidPassword = await bcrypt.compare(password, student.password_hash);

        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid email or password' })
        }
    
        res.json({
            message: 'Student login successful',
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
        res.status(500).send({message:error.message})
    }
})

export default router