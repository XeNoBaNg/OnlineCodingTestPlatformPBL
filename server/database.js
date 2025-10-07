// server/database.js (Add a connection test)
import pkg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
const { Pool } = pkg

const connectionString = process.env.DATABASE_URL; 

if (!connectionString) {
    console.error("FATAL ERROR: Database connection string is missing!");
}

const pool = new Pool ({
    connectionString: connectionString,
    ssl: { 
        rejectUnauthorized: false, 
    }
})

// 💡 NEW DEBUG BLOCK
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('CRITICAL DB CONNECTION FAILED:', err.stack); // This will force the error into the logs
    } else {
        console.log('Database connected successfully at:', res.rows[0].now);
    }
});
// 💡 END NEW DEBUG BLOCK

export default pool