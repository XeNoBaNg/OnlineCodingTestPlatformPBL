import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './Routes/userRoutes.js'

dotenv.config()
const app = express()

// 💡 REMOVED THE TRAILING SLASH (/) HERE for consistency!
const allowedOrigins = ['http://localhost:5173', 'https://online-coding-test-platform-pbl.vercel.app'] 

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            // If it fails, the origin variable contains the actual blocked URL.
            // This console.log line is helpful for debugging on Render!
            console.log('BLOCKED CORS REQUEST FROM:', origin); 
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())

app.use('/', userRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})