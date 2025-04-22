const BaseRepository = require('./BaseRepository');

class ProductRepository extends BaseRepository {
    constructor(model) {
        super(model);
    }

    async getProductsByCategory(categoryId) {
        return this.model.find({ category: categoryId, isActive: true });
    }

    async getActiveProducts() {
        return this.model.find({ isActive: true });
    }
}

module.exports = ProductRepository;