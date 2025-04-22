const BaseController = require('./BaseController');

class UserController extends BaseController {
    constructor(service) {
        super(service);
    }

    async getByEmail(req, res, next) {
        try {

            console.log(req)
            const user = await this.service.getByEmail(req.params.email);

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