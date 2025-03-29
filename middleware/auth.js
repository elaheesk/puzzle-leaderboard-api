require('dotenv').config();

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    }

    const token = authHeader.split(' ')[1];

    if (token !== process.env.API_TOKEN) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    next();
};
module.exports = authenticate;