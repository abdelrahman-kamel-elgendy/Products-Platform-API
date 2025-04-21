class ProductController {
    constructor(service) {
        this.service = service;
    }

    async getAll(req, res, next) {
        try {
            const products = await this.service.getAllProducts();
            res.status(200).json({
                status: 'success',
                message: 'All products retrieved successfully',
                data: {
                    length: products.length,
                    products
                }
            });
        } catch (error) {
            next(error);
        }
    }

    async getActive(req, res, next) {
        try {
            const products = await this.service.getActiveProducts();
            res.status(200).json({
                status: 'success',
                message: 'Active products retrieved successfully',
                data: {
                    length: products.length,
                    products
                }
            });
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const product = await this.service.getProductById(req.params.id);
            if (!product)
                throw new Error('Product not found');

            res.status(200).json({
                status: 'success',
                message: 'Product retrieved successfully',
                data: product
            });
        } catch (error) {
            next(error);
        }
    }

    async getByCategory(req, res, next) {
        try {
            const { category, products } = await this.service.getProductsByCategory(req.params.categoryId);
            res.status(200).json({
                status: 'success',
                message: `Products by ${category.name} category retrieved successfully`,
                data: {
                    length: products.length,
                    products
                }
            });
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const product = await this.service.createProduct(req.body);

            product.createdAt = undefined;
            product.isActive = undefined;

            res.status(201).json({
                status: 'success',
                message: 'Product created successfully',
                data: product
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const product = await this.service.updateProduct(req.params.id, req.body);
            if (!product)
                throw new Error('Product not found');

            res.status(200).json({
                status: 'success',
                message: 'Product updated successfully',
                data: product
            });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const product = await this.service.deleteProduct(req.params.id);
            if (!product)
                throw new Error('Product not found')

            res.status(200).json({
                status: 'success',
                message: 'Product deleted successfully'
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ProductController;