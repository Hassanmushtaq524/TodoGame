const express = require("express");
const router = express.Router();
const pool = require('../db');
const fetchuser = require('../middleware/fetchuser');

// TODO: Only for development
router.get("/all", async (req, res) => {
    try {
        let data = await pool.query("SELECT * FROM tasks");
        return res.status(200).json({ success: true, data: data.rows });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
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
        return res.status(500).json({ error: "Internal server error" });
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
        const date = new Date().toISOString();
        await pool.query(`INSERT INTO tasks (description, xp_value, created_by, created_at, updated_at, completed) 
                        VALUES ($1, $2, $3, $4, $5, $6)`, 
                        [description, xpValue, user._id, date, date, false]);
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
})

/**
 * Delete task
 */
router.delete("/:id", fetchuser, async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;

        /**
         * Retrieve the task with the id and check if the user is the same
         */
        const data = await pool.query(`SELECT * FROM tasks WHERE _id = $1`, [id]);
        if (!data.rows.length) {
            return res.status(404).json({ success: false, error: "Error while deleting task"});
        }

        const foundTask = data.rows[0];
        if (foundTask.created_by != user._id) {
            return res.status(404).json({ success: false, error: "Error while deleting task"});
        }
        /**
         * Delete
         */
        await pool.query(`DELETE FROM tasks WHERE _id = $1 AND created_by = $2`, [id, user._id]);

        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
})


/**
 * Update a task
 */
router.patch("/:id", fetchuser, async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const { description, xpValue, completed } = req.body;

        /**
         * Verify
         */
        const data = await pool.query(`SELECT * FROM tasks WHERE _id = $1`, [id]);
        if (!data.rows.length) {
            return res.status(404).json({ success: false, error: "Error while updating task"});
        }

        const foundTask = data.rows[0];
        if (foundTask.created_by != user._id) {
            return res.status(404).json({ success: false, error: "Error while updating task"});
        }

        /**
         * Update the task
         */
        const date = new Date().toISOString();

        const updatedTask = {
            _id: foundTask._id,
            description: ((description)? description: foundTask.description),
            xpValue: ((xpValue) ? xpValue : foundTask.xp_value),
            createdAt: foundTask.created_at,
            createdBy: user._id,
            updatedAt: date,
            completed: ((completed) ? completed: foundTask.completed)
        };

        await pool.query(`UPDATE tasks SET description = $1, 
            xp_value = $2, 
            created_at = $3, 
            created_by = $4, 
            updated_at = $5,
            completed = $6
            WHERE _id = $7`, [ updatedTask.description, 
                updatedTask.xpValue,
                updatedTask.createdAt,
                updatedTask.createdBy,
                updatedTask.updatedAt,
                updatedTask.completed,
                updatedTask._id ]);
        
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;