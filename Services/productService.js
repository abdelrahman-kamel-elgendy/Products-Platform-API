const BaseService = require('./BaseService');
const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow(''),
    price: Joi.number().min(0).required(),
    category: Joi.string().required(),
    images: Joi.array().items(Joi.string()),
    isActive: Joi.boolean()
});

class ProductService extends BaseService {
    constructor(productRepository, categoryRepository) {
        super(productRepository)
        this.categoryRepository = categoryRepository;
    }

    async getByCategory(categoryId) {
        const category = await this.categoryRepository.getById(categoryId);
        if (!category)
            throw new Error('Category not found');

        const products = await this.productRepository.getProductsByCategory(categoryId);

        return { category, products };
    }

    async create(productData) {
        const { error } = productSchema.validate(productData);
        if (error)
            throw new Error(error.details[0].message);

        return this.repository.create(productData);
    }

    async update(id, productData) {
        const { error } = productSchema.validate(productData);
        if (error)
            throw new Error(error.details[0].message);

        return this.repository.update(id, productData);
    }
}

module.exports = ProductService;