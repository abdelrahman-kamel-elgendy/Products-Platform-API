const BaseService = require('./BaseService');
const Joi = require('joi');

const CreateUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid('admin', 'customer').default('customer'),
    isActive: Joi.boolean().default(true),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({ 'any.only': 'Passwords do not match' })
}).with('password', 'confirmPassword');

const UpdateUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid('admin', 'customer').default('customer')
});

class UserService extends BaseService {
    constructor(repository) {
        super(repository);
    }

    async create(UserData) {
        const { error } = CreateUserSchema.validate(UserData);
        if (error)
            throw new Error(error.details[0].message);

        return this.repository.create(UserData);
    }

    async update(id, userData) {
        const { error } = UpdateUserSchema.validate(userData);
        if (error)
            throw new Error(error.details[0].message);

        return this.repository.update(id, userData);
    }

    async getByEmail(email) {
        return this.repository.getByEmail(email);
    }

}

module.exports = UserService