const express = require('express');
const rateLimit = require('express-rate-limit');
require('dotenv').config();


const app = express();
app.use(express.json());

    
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    message: { error: 'Too many requests — try again later.' }
});
app.use('/scores', limiter);


const scoresRoutes = require('./routes/scores');
const playersRoutes = require('./routes/players');
const leaderboardRoutes = require('./routes/leaderboard');


app.use(scoresRoutes);
app.use(playersRoutes);
app.use(leaderboardRoutes);


app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Puzzle game' });
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

