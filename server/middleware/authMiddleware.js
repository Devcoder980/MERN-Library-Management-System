const jwt = require('jsonwebtoken');
const config = require('../config/jwt.config'); // Import your JWT configuration

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>' format

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, config.secret);
        req.user = decoded; // Attach decoded user information to the request object
        next();
    } catch (error) {
        res.status(403).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = {
    verifyToken,
};
