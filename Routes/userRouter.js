const express = require('express');
const router = express.Router();

module.exports = (controller) => {
    router.route('/')
        .get(controller.getAll.bind(controller))
        .post(controller.create.bind(controller));

    router.route('/:id')
        .get(controller.getById.bind(controller))
        .update(controller.update.bind(controller))
        .delete(controller.delete.bind(controller));

    router.route('/:email').get(controller.getByEmail.bind(controller));

    return router
}