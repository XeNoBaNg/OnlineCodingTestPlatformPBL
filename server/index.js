import express from "express";
import dotenv from "dotenv";
import pg from "pg";
import cors from "cors";
import bcrypt from "bcrypt";

dotenv.config();

const saltRounds = 10;
const app = express();
const port = process.env.SERVER_PORT;

const { Client } = pg;
const db = new Client({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE,
});
await db.connect();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send();
});

app.get("/getAllData", async (req, res) => {
    try {
        const resp = (await db.query(`SELECT * FROM users`)).rows;
        console.log(resp);
        if (resp.length == 0) {
            res.send("Table empty!");
        } else {
            res.status(200).send(resp);
        }
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
});

app.post("/register", async (req, res) => {
    const { name, reg_id, email, password } = req.body;
    const matches = (
        await db.query("SELECT * FROM users WHERE reg_id=$1", [reg_id])
    ).rows;
    if (matches.length != 0) {
        res.status(400).send("Registration ID already exists!");
    } else {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const resp = await db.query(
            "INSERT INTO users (email, reg_id, password, name) VALUES ($1, $2, $3, $4)",
            [email, reg_id, hashedPassword, name]
        );
        console.log("Entry added successfully!");
        res.send("User registered successfully!");
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const match = (
        await db.query("SELECT * FROM users WHERE email=$1", [email])
    ).rows[0];
    if (!match) {
        res.status(400).send("User Not Found");
    } else {
        const areEqual = await bcrypt.compare(password, match.password);
        if(areEqual){
            res.send("Login Successful!");
        } else {
            res.status(400).send("Incorrect Password");
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
