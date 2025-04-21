const CRUD_Controller = require('./CRUD_Controller')
class CategoryController extends CRUD_Controller {
    constructor(service) {
        super(service)
    }
}

module.exports = CategoryController;