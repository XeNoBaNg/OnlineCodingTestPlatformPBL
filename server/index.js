import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './Routes/userRoutes.js'

dotenv.config()
const app = express()

const allowedOrigins = ['http://localhost:5173', 'https://online-coding-test-platform-pbl.vercel.app/'] // Replace YOUR_VERCEL_URL
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true // Important if you use cookies/sessions/headers
}
app.use(cors(corsOptions))
app.use(express.json())

app.use('/', userRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})