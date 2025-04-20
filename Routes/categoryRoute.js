const express = require('express');
const router = express.Router();

router.route

module.exports = (controller) => {
    router.route('/')
        .get(controller.getAll.bind(controller))
        .post(controller.create.bind(controller));

    router.route('/:id')
        .get(controller.getById.bind(controller))
        .patch(controller.update.bind(controller))
        .delete(controller.delete.bind(controller));

    router.get('/active', controller.getActive.bind(controller));

    return router;
};