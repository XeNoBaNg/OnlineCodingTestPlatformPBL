import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './Routes/userRoutes.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/', userRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})