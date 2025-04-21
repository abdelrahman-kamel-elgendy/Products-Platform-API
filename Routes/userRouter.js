const express = require('express');
const router = express.Router();

module.exports = (controller) => {
    router('/')
        .get(controller.getAll.bind(controller))
        .post(controller.create.bind(controller));

    return router
}