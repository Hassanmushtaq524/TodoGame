const express = require("express");
const router = express.Router();
const pool = require('../db');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "bradley";


// TODO: Only for development
router.get("/", async (req, res) => {
    try {
        let data = await pool.query("SELECT * FROM users");
        return res.status(200).json({ success: true, data: data.rows });
    } catch (error) {
        return res.status(500).json({ error });
    }
})


/**
 * Login the user
 */
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body; 
        
        /**
         * Find the user and compare passwords
         */
        let users = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);
        if (!users.rows.length) {
            return res.status(401).json({ success: false, message: "Incorrect username/password" });
        }
        
        user = users.rows[0];
        let check = await bcrypt.compareSync(password, user.password);

        if (!check) {
            return res.status(401).json({ success: false, message: "Incorrect username/password" });
        }

        const signData = {
            user: {
                _id: user._id
            }
        }

        const jwtToken = jwt.sign(signData, jwtSecret);

        return res.status(200).json({ success: true, token: jwtToken, user: user });
    } catch (error) {
        return res.status(500).json({ error });
    }
})

/**
 * Signs the user up
 */
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        /**
         * Check if user already exists
        */
        let users = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (users.rows.length) {
            return res.status(400).json({ success: false, message: "User is already registered" });
        }
        
        /**
         * Sign the user up and return token 
         */
        let secPass = await bcrypt.hash(password, 10);
        
        const date = new Date();
        const dateStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        await pool.query(`INSERT INTO users (username, email, password, level, total_xp, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                                [username, email, secPass, 0, 0, dateStr, dateStr]);
        
        
        users = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        user = users.rows[0];
        const signData = {
            user: {
                _id: user._id
            }
        }
        const jwtToken = jwt.sign(signData, jwtSecret);

        return res.status(200).json({ success: true, token: jwtToken, user: user });
    } catch (error) {
        res.status(500).json({ error });
    }
})


module.exports = router;