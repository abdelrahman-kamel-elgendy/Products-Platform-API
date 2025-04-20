const jwt = require('jsonwebtoken');
const Joi = require('joi');

const signupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('user', 'admin')
});

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

        const user = await this.userRepository.getByEmail(email);
        
        if (!user) 
            throw new Error('Invalid credentials');

        const isMatch = await user.comparePassword(password);
        
        if (!isMatch) 
            throw new Error('Invalid credentials');

        const token = jwt.sign(
            { id: user._id, role: user.role },
            this.jwtSecret,
            { expiresIn: this.jwtExpiresIn }
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

    verifyToken(token) {
        return jwt.verify(token, this.jwtSecret);
    }
}

module.exports = AuthService;