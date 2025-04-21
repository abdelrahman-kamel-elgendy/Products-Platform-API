class BaseService {
    constructor(repository) {
        this.repository = repository;
    }

    async getAll() {
        return this.repository.getAll();
    }

    async getActive() {
        return this.repository.getActiveCategories();
    }

    async getById(id) {
        return this.repository.getById(id);
    }

    async delete(id) {
        return this.repository.delete(id);
    }

    async create(Data) {
        throw new Error('Abstract method must be implemented');
    }

    async update(Data) {
        throw new Error('Abstract method must be implemented');
    }
}

module.exports = BaseService;