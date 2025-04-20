class ProductController {
    constructor(service) {
        this.service = service;
    }

    async getAll(req, res, next) {
        try {
            const products = await this.service.getAllProducts();
            res.json(products);
        } catch (error) {
            next(error);
        }
    }

    async getActive(req, res, next) {
        try {
            const products = await this.service.getActiveProducts();
            res.json(products);
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const product = await this.service.getProductById(req.params.id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            next(error);
        }
    }

    async getByCategory(req, res, next) {
        try {
            const products = await this.service.getProductsByCategory(req.params.categoryId);
            res.json(products);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const product = await this.service.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const product = await this.service.updateProduct(req.params.id, req.body);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const product = await this.service.deleteProduct(req.params.id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json({ message: 'Product deleted successfully' });
        } catch (error) {
            next(error);
        }
    }

    async search(req, res, next) {
        try {
            const products = await this.service.searchProducts(req.query.q);
            res.json(products);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ProductController;