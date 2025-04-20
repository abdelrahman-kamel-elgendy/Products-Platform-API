class CategoryController {
    constructor(service) {
        this.service = service;
    }

    async getAll(req, res, next) {
        try {
            const categories = await this.service.getAllCategories();
            res.status(200).json({
                status: 'success',
                length: categories.length,
                data: categories,
            });
        } catch (error) {
            next(error);
        }
    }

    async getActive(req, res, next) {
        try {
            const categories = await this.service.getActiveCategories();
            res.status(200).json({
                status: 'success',
                length: categories.length,
                data: categories,
            });
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const category = await this.service.getCategoryById(req.params.id);
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.status(200).json({
                status: 'success',
                data: category,
            });
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const category = await this.service.createCategory(req.body);
            res.status(201).json(category);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const category = await this.service.updateCategory(req.params.id, req.body);
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.json(category);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const category = await this.service.deleteCategory(req.params.id);
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.json({ message: 'Category deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = CategoryController;