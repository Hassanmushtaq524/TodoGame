const express = require("express");
const router = express.Router();
const pool = require('../db');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const getLevel = require("../helpers/getLevel");


/**
 * TODO: see if u need this
 */
router.get("/", fetchuser, async (req, res) => {
    try {
        const user = req.user;

        /**
         * Match the user id in the database and return user data
         */
        let data = await pool.query("SELECT * FROM users WHERE _id = $1", [user._id]);
        if (!data.rows.length) {
            return res.status(404).json({ success: false });
        }

        delete data.rows[0].password;
        return res.status(200).json({ success: true, user: data.rows[0] });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
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

        const jwtToken = jwt.sign(signData, process.env.JWT_SECRET);

        delete user.password;
        return res.status(200).json({ success: true, token: jwtToken, user: user });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
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
        
        const date = new Date().toISOString();
        await pool.query(`INSERT INTO users (username, email, password, level, total_xp, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                                [username, email, secPass, 0, 0, date, date]);
        
        
        users = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        user = users.rows[0];
        const signData = {
            user: {
                _id: user._id
            }
        }
        const jwtToken = jwt.sign(signData, process.env.JWT_SECRET);

        delete user.password;
        return res.status(200).json({ success: true, token: jwtToken, user: user });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})


// TODO: Test
/**
 * Updating user's xp and level
 * 
 * Auth: required
 */
router.patch("/", fetchuser, async (req, res) => {
    try {
        /**
         * Get user data
         */
        let user = req.user;
        const { xpGained } = req.body;
        let data = await pool.query(`SELECT * FROM users WHERE _id = $1`, [user._id]);
        if (!data.rows.length) {
            return res.status(404).json({ success: false });
        }
        user = data.rows[0];

        /**
         * Get new level and update it
         */
        const newLevel = getLevel(user.level, user.total_xp, ((xpGained) ? xpGained : 0));
        const newTotalXp = user.total_xp + ((xpGained) ? xpGained : 0);
        await pool.query(`UPDATE users SET level = $1, total_xp = $2 WHERE _id = $3`, [newLevel, newTotalXp, user._id]);

        /**
         * Get updated user
         */
        data = await pool.query(`SELECT * FROM users WHERE _id = $1`, [user._id]);
        if (!data.rows.length) {
            return res.status(404).json({ success: false });
        }
        user = data.rows[0];

        delete user.password;
        return res.status(200).json({ success: true, user: user });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})


module.exports = router;