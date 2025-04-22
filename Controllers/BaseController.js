class BaseController {
    constructor(service) {
        this.service = service
    }

    async create(req, res, next) {
        try {
            const data = await this.service.create(req.body);

            if (data.password) {
                data.password = undefined;
                data.passwordUpdatedAt = undefined;
            }
            data.createdAt = undefined;
            data.isActive = undefined;

            res.status(201).json({
                status: 'success',
                data
            });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const data = await this.service.getAll();

            res.status(200).json({
                status: 'success',
                length: data.length,
                data
            });
        } catch (error) {
            next(error);
        }
    }

    async getActive(req, res, next) {
        try {
            const data = await this.service.getActive();

            res.status(200).json({
                status: 'success',
                length: data.length,
                data
            });
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const data = await this.service.getById(req.params.id);
            if (!data)
                throw Error('Not found');

            res.status(200).json({
                status: 'success',
                data
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const data = await this.service.update(req.params.id, req.body);
            if (!data)
                throw new Error('Not found');

            res.status(200).json({
                status: 'success',
                data
            });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const data = await this.service.delete(req.params.id);
            if (!data)
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