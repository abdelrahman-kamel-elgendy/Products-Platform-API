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

    async searchProducts(query) {
        return this.model.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ],
            isActive: true
        });
    }
}

module.exports = ProductRepository;