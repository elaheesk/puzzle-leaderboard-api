const authenticate = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const pool = require('../db/index');


router.get('/leaderboard', authenticate, async (req, res) => {
    try {

      const result = await pool.query(`
      SELECT name, scores
      FROM players
      ORDER BY scores DESC
      LIMIT 10
    `);
     
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Database error." });
    }
});



router.get('/rank/:name', authenticate, async (req, res) => {
    const playerName = req.params.name;

    try {
        const result = await pool.query(`
      SELECT rank FROM (
        SELECT name, scores, RANK() OVER (ORDER BY scores DESC) AS rank
        FROM players
      ) ranked
      WHERE name = $1
    `, [playerName]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Player not found" });
        }

        res.status(200).json({
            name: playerName,
            rank: result.rows[0].rank
        });

    } catch (err) {
        res.status(500).json({ error: "Database error." });
    }
});
module.exports = router;