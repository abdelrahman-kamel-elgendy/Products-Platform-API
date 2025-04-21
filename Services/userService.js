const BaseService = require('./BaseService');
const Joi = require('joi');

const UserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid('admin', 'customer').default('user'),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({ 'any.only': 'Passwords do not match' })
}).with('password', 'confirmPassword');  // Ensures confirmPassword exists when password exists

class UserService extends BaseService {
    constructor(repository) {
        super(repository);
    }

    async create(UserData) {
        const { error } = UserSchema.validate(UserData);
        if (error)
            throw new Error(error.details[0].message);

        return this.repository.create(UserData);
    }

    async update(UserData) {
        const { error } = UserSchema.validate(UserData);
        if (error)
            throw new Error(error.details[0].message);

        return this.repository.create(UserData);
    }

    async getByEmail(email) {
        return this.repository.getByEmail(email);
    }

}

module.exports = UserService