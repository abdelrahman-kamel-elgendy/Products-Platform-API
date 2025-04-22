const express = require('express');
const router = express.Router();

module.exports = (controller) => {
    router.post('/forgot', controller.forgotPassword.bind(controller));
    router.post('/reset', controller.resetPassword.bind(controller));

    return router;
};