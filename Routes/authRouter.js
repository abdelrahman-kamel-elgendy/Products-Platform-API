const express = require('express');
const router = express.Router();

module.exports = (controller) => {
    router.post('/signup', controller.signup.bind(controller));
    router.post('/login', controller.login.bind(controller));

    return router;
};