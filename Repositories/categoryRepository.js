const BaseRepository = require('./BaseRepository');

class CategoryRepository extends BaseRepository {
    constructor(model) {
        super(model);
    }

    async getActiveCategories() {
        return this.model.find({ isActive: true });
    }

    async getCategoryByName(name) {
        return this.model.findOne({ name });
    }
}

module.exports = CategoryRepository;