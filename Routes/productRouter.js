const express = require('express');
const router = express.Router();

module.exports = (controller) => {
    router.get('/active', controller.getActive.bind(controller));
    router.get('/category/:categoryId', controller.getByCategory.bind(controller));

    router.route('/')
        .get(controller.getAll.bind(controller))
        .post(controller.create.bind(controller));

    router.route('/:id')
        .get(controller.getById.bind(controller))
        .put(controller.update.bind(controller))
        .delete(controller.delete.bind(controller));

    return router;
};