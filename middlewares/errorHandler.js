const errorHandler = (err, req, res, next) => {
    console.error(err);

    const statusCode = err.status || 500;
    const message = statusCode === 500 ? 'Something went wrong!' : err.message;

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            error: {
                type: 'Validation Error',
                message: err.message
            }
        });
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            error: {
                type: 'Authentication Error',
                message: 'Invalid token'
            }
        });
    }

    if (err.message.toLowerCase().includes('not found')) {
        return res.status(404).json({
            success: false,
            error: {
                type: 'Not Found',
                message: err.message
            }
        });
    }

    if (err.message.includes('already exists')) {
        return res.status(409).json({
            success: false,
            error: {
                type: 'Conflict',
                message: err.message
            }
        });
    }

    res.status(statusCode).json({
        success: false,
        error: {
            type: 'Internal Server Error',
            message: err.message || 'Something went wrong!'
        }
    });
};

module.exports = errorHandler;