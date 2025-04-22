const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => {
    return async (req, res, next) => {
        try {
            // Check both Authorization header and cookies
            const token = req.cookies.token ||
                (req.headers.authorization && req.headers.authorization.split(' ')[1]);

            if (!token) {
                throw new Error('Authentication token missing');
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Check if user has required role
            if (roles.length && !roles.includes(decoded.role))
                throw new Error('Unauthorized access');

            req.user = decoded;
            next();
        } catch (error) {
            error.status = 401;
            next(error);
        }
    };
};

module.exports = authMiddleware;