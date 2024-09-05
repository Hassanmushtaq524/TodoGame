require('dotenv').config();
const express = require('express');
const pool = require('./db');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());

//  Configure CORS options
const corsOptions = {
    origin: process.env.FRONTEND_URL, // Allow only your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'auth-token'],
};

app.use(cors(corsOptions));

/**
 * Constants
 */
const PORT = Number(process.env.APP_PORT);


/**
 * Setup
 */
app.get('/api/', async (req, res) => {
    try {

        return res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
})


/**
 * Routes
 */ 
app.use("/api/users", require("./routes/users"));
app.use("/api/tasks", require("./routes/tasks"));
// app.use("/api/levels", require("./routes/levels"));


/**
 * Listen on PORT
 */
app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
})