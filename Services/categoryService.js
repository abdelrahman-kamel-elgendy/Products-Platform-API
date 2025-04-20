const Joi = require('joi'); // Importing Joi for validation

const categorySchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow(''),
    isActive: Joi.boolean()
});

class CategoryService {
    constructor(repository) {
        this.repository = repository;
    }

    async getAllCategories() {
        return this.repository.getAll();
    }

    async getActiveCategories() {
        return this.repository.getActiveCategories();
    }

    async getCategoryById(id) {
        return this.repository.getById(id);
    }

    async createCategory(categoryData) {
        const { error } = categorySchema.validate(categoryData);
        if (error) throw new Error(error.details[0].message);

        const existingCategory = await this.repository.getCategoryByName(categoryData.name);
        if (existingCategory) throw new Error('Category already exists');

        return this.repository.create(categoryData);
    }

    async updateCategory(id, categoryData) {
        const { error } = categorySchema.validate(categoryData);
        if (error) throw new Error(error.details[0].message);

        return this.repository.update(id, categoryData);
    }

    async deleteCategory(id) {
        return this.repository.delete(id);
    }
}

module.exports = CategoryService;