const CRUD_Controller = require('./CRUD_Controller');

class UserController extends CRUD_Controller {
    constructor(service) {
        super(service);
    }

    async getByEmail(req, res, next) {
        try {
            const user = await this.service.getByEmail(req.email);

            if (!user)
                throw new Error('User not found');

            res.status(200).json({
                status: 'success',
                data: {
                    user,
                },
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;