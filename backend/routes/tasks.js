const express = require("express");
const router = express.Router();
const pool = require('../db');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "bradley";


// TODO: Only for development
router.get("/all", async (req, res) => {
    try {
        let data = await pool.query("SELECT * FROM tasks");
        return res.status(200).json({ success: true, data: data.rows });
    } catch (error) {
        return res.status(500).json({ error });
    }
})

/**
 * Get all task
 * 
 * Auth: required 
 */
router.get("/", fetchuser, async (req, res) => {
    try {
        const user = req.user;
        /**
         * Get the tasks for the current authenticated user
         */
        const data = await pool.query(`SELECT * FROM tasks WHERE created_by = $1`, [user._id]);
        return res.status(200).json({ success: true, data: data.rows});
    } catch (error) {
        return res.status(500).json({ error });
    }
})


/**
 * Add the task
 * 
 * Auth: required
 */
router.post("/", fetchuser, async (req, res) => {
    try {
        const user = req.user;
        const { description, xpValue } = req.body;
        /**
         * Add the task
         */
        const date = new Date();
        const dateStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        await pool.query(`INSERT INTO tasks (description, xp_value, created_by, created_at, updated_at, completed) 
                        VALUES ($1, $2, $3, $4, $5, $6)`, 
                        [description, xpValue, user._id, dateStr, dateStr, false]);
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error });
    }
})

/**
 * Delete task
 */
// router.post("/", async (req, res) => {
//     try {
        
//     } catch (error) {
//         res.status(500).json({ error });
//     }
// })


module.exports = router;