const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow(''),
    price: Joi.number().min(0).required(),
    category: Joi.string().required(),
    images: Joi.array().items(Joi.string()),
    isActive: Joi.boolean()
});

class ProductService {
    constructor(productRepository, categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    async getAllProducts() {
        return this.productRepository.getAll();
    }

    async getActiveProducts() {
        return this.productRepository.getActiveProducts();
    }

    async getProductById(id) {
        return this.productRepository.getById(id);
    }

    async getProductsByCategory(categoryId) {
        const category = await this.categoryRepository.getById(categoryId);
        if (!category)
            throw new Error('Category not found');

        const products = await this.productRepository.getProductsByCategory(categoryId);

        return { category, products };
    }

    async createProduct(productData) {
        const { error } = productSchema.validate(productData);
        if (error)
            throw new Error(error.details[0].message);

        return this.productRepository.create(productData);
    }

    async updateProduct(id, productData) {
        const { error } = productSchema.validate(productData);
        if (error)
            throw new Error(error.details[0].message);

        return this.productRepository.update(id, productData);
    }

    async deleteProduct(id) {
        return this.productRepository.delete(id);
    }
}

module.exports = ProductService;