const Joi = require('joi'); // Importing Joi for validation

const categorySchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow(''),
    isActive: Joi.boolean(),
    products: Joi.array().items(Joi.string())
});

class CategoryService {
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

    async create(categoryData) {
        const { error } = categorySchema.validate(categoryData);
        if (error) throw new Error(error.details[0].message);

        const existingCategory = await this.repository.getCategoryByName(categoryData.name);
        if (existingCategory) throw new Error('Category already exists');

        return this.repository.create(categoryData);
    }

    async update(id, categoryData) {
        const { error } = categorySchema.validate(categoryData);
        if (error) throw new Error(error.details[0].message);

        return this.repository.update(id, categoryData);
    }

    async delete(id) {
        return this.repository.delete(id);
    }
}

module.exports = CategoryService;