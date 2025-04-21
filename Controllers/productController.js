const BaseController = require('./BaseController');

class ProductController extends BaseController {
    constructor(service) {
        super(service);
    }

    async getByCategory(req, res, next) {
        try {
            const { category, products } = await this.service.getByCategory(req.params.categoryId);
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
}

module.exports = ProductController;