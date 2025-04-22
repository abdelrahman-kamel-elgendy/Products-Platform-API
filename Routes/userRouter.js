const express = require('express');
const router = express.Router();

module.exports = (controller) => {

    router.route('/active').get(controller.getActive.bind(controller));

    router.route('/email/:email').get(controller.getByEmail.bind(controller));

    router.route('/:id')
        .get(controller.getById.bind(controller))
        .put(controller.update.bind(controller))
        .delete(controller.delete.bind(controller));

    router.route('/')
        .get(controller.getAll.bind(controller))
        .post(controller.create.bind(controller));

    return router
}