const authenticate = require('../middleware/auth');
const pool = require('../db/index');
const express = require('express');
const router = express.Router();


router.get('/players/:name', authenticate, async (req, res) => {
    const playerName = req.params.name;

    try {
        const result = await pool.query(`
      SELECT playerid, name, scores, rank FROM (
        SELECT playerid, name, scores, RANK() OVER (ORDER BY scores DESC) AS rank
        FROM players
      ) ranked
      WHERE name = $1
    `, [playerName]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Player not found" });
        }

        const player = result.rows[0];

        res.status(200).json({
            playerid: player.playerid,
            name: player.name,
            scores: player.scores,
            rank: player.rank
        });

    } catch (err) {
        res.status(500).json({ error: "Database error." });
    }
});


// POST a new player
router.post('/players', async (req, res) => {
    const { name,scores } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO players (name, scores) VALUES ($1, $2) RETURNING *',
            [name, scores]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).send("Database error");
    }
});

module.exports = router;