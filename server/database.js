import pkg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
const { Pool } = pkg

const pool = new Pool ({
    host: process.env.HOST,
    database: process.env.DATABASE,
    port: Number(process.env.PORT_DB),
    user: process.env.USER,
    password: process.env.PASSWORD,
    ssl: {
        rejectUnauthorized: false, 
    }
})

export default pool