class BaseService {
    constructor(repository) {
        this.repository = repository;
    }

    async getAll() {
        return this.repository.getAll();
    }

    async getActive() {
        return this.repository.getActive();
    }

    async getById(id) {
        return this.repository.getById(id);
    }

    async delete(id) {
        return this.repository.delete(id);
    }
}

module.exports = BaseService;