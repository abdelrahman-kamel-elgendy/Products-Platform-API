const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.status || 500;
    const message = statusCode === 500 ? 'Something went wrong!' : err.message;

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Validation Error',
            details: err.message
        });
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Invalid token' });
    }

    if (err.message.includes('not found')) {
        return res.status(404).json({ error: err.message });
    }

    if (err.message.includes('already exists')) {
        return res.status(409).json({ error: err.message });
    }

    res.status(500).json({ error: err.message || 'Something went wrong!' });
};

module.exports = errorHandler;