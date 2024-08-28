const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Constants
 */
const PORT = 3000;


/**
 * Setup
 */
app.get('/api/', async (req, res) => {
    try {
        // await pool.query(`DROP TABLE users`);
        await pool.query(`CREATE TABLE IF NOT EXISTS users 
            (_id SERIAL PRIMARY KEY, 
            username VARCHAR(100), 
            email VARCHAR(100),
            password VARCHAR(100),
            level INTEGER,
            totalXp INTEGER,
            createdAt DATE,
            updatedAt DATE)`);
        return res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
})


/**
 * Routes
 */ 
app.use("/api/auth", require("./routes/auth"));
// app.use("/api/tasks", require("./routes/tasks"));
// app.use("/api/levels", require("./routes/levels"));


/**
 * Listen on PORT
 */
app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
})