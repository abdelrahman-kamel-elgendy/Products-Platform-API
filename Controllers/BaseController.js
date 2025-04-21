class BaseController {
    constructor(service) {
        this.service = service
    }

    async create(req, res, next) {
        try {
            const entity = await this.service.create(req.body);
            if (entity.password) {
                entity.password = undefined;
                entity.passwordUpdatedAt = undefined;
            }
            entity.createdAt = undefined;
            entity.isActive = undefined;

            res.status(201).json({
                status: 'success',
                data: {
                    entity,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const entity = await this.service.getAll();

            res.status(200).json({
                status: 'success',
                data: {
                    length: entity.length,
                    entity,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async getActive(req, res, next) {
        try {
            const categories = await this.service.getActive();

            res.status(200).json({
                status: 'success',
                data: {
                    length: categories.length,
                    categories,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const entity = await this.service.getById(req.params.id);
            if (!entity)
                throw Error('Not found');

            res.status(200).json({
                status: 'success',
                data: {
                    entity,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const entity = await this.service.update(req.params.id, req.body);
            if (!entity)
                throw new Error('Not found');

            res.status(200).json({
                status: 'success',
                data: {
                    entity,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const entity = await this.service.delete(req.params.id);
            if (!entity)
                throw new Error('Not found');

            res.status(200).json({
                status: 'success',
                message: 'Deleted successfully',
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = BaseController;