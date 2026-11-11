const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secure_national_sports_portal_key_2026';

// Middleware to verify JWT tokens
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer TOKEN

    if (!token) {
        return res.status(401).json({ error: 'Access token missing or invalid' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Token expired or authentication failed' });
    }
};

// Middleware to authorize specific roles
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Permission denied. Unauthorized role.' });
        }
        next();
    };
};

module.exports = {
    authenticateToken,
    authorizeRoles
};
