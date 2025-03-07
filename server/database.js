import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool ({
    host: "ep-purple-bar-a8ndnp5z-pooler.eastus2.azure.neon.tech",
    database: "pbl",
    port: 5432,
    user: "pbl_owner",
    password: "npg_efns9g2xpjcX",
    ssl: {
        rejectUnauthorized: false, 
    }
})

export default pool