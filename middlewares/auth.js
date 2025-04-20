const authMiddleware = (roles = []) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer '))
                throw new Error('Authentication token missing');

            const token = authHeader.split(' ')[1];
            const authService = req.container.resolve('authService');
            const decoded = authService.verifyToken(token);

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