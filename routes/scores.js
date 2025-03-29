const authenticate = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const pool = require('../db/index');


router.post('/scores', authenticate, async (req, res) => {
    const { name, scores } = req.body;

    if (!name || !scores) {
        return res.status(400).json({ error: "Name and score are required." });
    }

    try {
        const query = `
      INSERT INTO players (name, scores, created_at)
      VALUES ($1, $2, NOW())
      ON CONFLICT (name)
      DO UPDATE SET scores = players.scores + EXCLUDED.scores
    `;
        await pool.query(query, [name, scores]);

        res.status(200).json({ message: "Scores added successfully." });
    }   catch (err) {
        res.status(500).json({ error: "Database error." });
    }
});
module.exports = router;