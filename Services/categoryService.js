const BaseService = require('./BaseService');
const Joi = require('joi'); // Importing Joi for validation

const categorySchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow(''),
    isActive: Joi.boolean(),
    products: Joi.array().items(Joi.string())
});

class CategoryService extends BaseService {
    constructor(repository) {
        super(repository);
    }

    async create(categoryData) {
        const { error } = categorySchema.validate(categoryData);
        if (error)
            throw new Error(error.details[0].message);

        const existingCategory = await this.repository.getCategoryByName(categoryData.name);
        if (existingCategory)
            throw new Error(`Category already exists with ID: ${existingCategory.id}`);

        return this.repository.create(categoryData);
    }

    async update(id, categoryData) {
        const { error } = categorySchema.validate(categoryData);
        if (error)
            throw new Error(error.details[0].message);

        return this.repository.update(id, categoryData);
    }


}

module.exports = CategoryService;