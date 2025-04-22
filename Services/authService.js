const jwt = require('jsonwebtoken');
const Joi = require('joi');

const signupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({ 'any.only': 'Passwords do not match' })
}).with('password', 'confirmPassword');


const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.jwtSecret = process.env.JWT_SECRET;
        this.jwtExpiresIn = process.env.JWT_EXPIRES_IN;
    }

    async signup(userData) {
        const { error } = signupSchema.validate(userData);
        if (error)
            throw new Error(error.details[0].message);

        const existingUser = await this.userRepository.getByEmail(userData.email);

        if (existingUser)
            throw new Error('Email already in use');

        return this.userRepository.create(userData);
    }

    async login(email, password) {
        const { error } = loginSchema.validate({ email, password });
        if (error)
            throw new Error(error.details[0].message);

        const user = await this.userRepository.getByEmailWithPassword(email);

        if (!user.isActive)
            throw new Error('Account deleted!');

        if (!user)
            throw new Error('Invalid credentials');
        console.log(await user.comparePassword(password, user.password))

        if (!await user.comparePassword(password, user.password))
            throw new Error('Invalid credentials');

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        return {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };
    }
}

module.exports = AuthService;