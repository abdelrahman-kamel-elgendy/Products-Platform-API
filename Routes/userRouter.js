const authMiddleware = require('../middlewares/auth');
const express = require('express');
const router = express.Router();

module.exports = (controller) => {

    router.route('/active').get(controller.getActive.bind(controller));

    router.route('/email/:email').get(controller.getByEmail.bind(controller));

    router.route('/:id')
        .get(authMiddleware(['admin']), controller.getById.bind(controller))
        .put(controller.update.bind(controller))
        .delete(authMiddleware(['admin']), controller.delete.bind(controller));

    router.route('/')
        .get(authMiddleware(['admin']), controller.getAll.bind(controller))
        .post(authMiddleware(['admin']), controller.create.bind(controller));

    return router
}