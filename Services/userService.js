const CRUD_Service = require('./CRUD_Service');

class UserService extends CRUD_Service {
    constructor(repository) {
        super(repository);
    }

    async create() {
        
    }

}

module.exports = UserService