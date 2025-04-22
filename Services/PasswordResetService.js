const crypto = require('crypto');
const emailTemplates = require('../emailTemoleats');
const EmailService = require('./emailService');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

class PasswordResetService {
    constructor(repository) {
        this.repository = repository;
        this.emailService = new EmailService();
    }

    async generateResetToken(email) {

        const user = await this.repository.getByEmail(email);
        if (!user)
            throw new Error('User not found');

        const token = crypto.randomBytes(32).toString('hex');
        const expires = Date.now() + 3600000;

        user.resetPasswordToken = token;
        user.resetPasswordExpires = expires;
        await this.repository.save(user);

        return token;
    }

    async sendResetEmail(email, token, host) {
        const resetUrl = `${host}/resetRassword?token=${token}`;

        const { html, text } = await emailTemplates.loadTemplate('password-reset', {
            resetUrl
        });

        const mailOptions = {
            to: email,
            subject: 'Reset Your Password - Action Required',
            html,
            text
        };

        await this.emailService.sendMail(mailOptions);
    }

    async validateResetToken(token) {
        const user = await this.repository.getwithPasswordToken(token);

        if (!user)
            throw new Error('Invalid or expired token');

        return user;
    }

    async resetPassword(token, newPassword) {
        const user = await this.validateResetToken(token);

        // Update password and clear reset fields
        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await this.repository.save(user);
        return user;
    }
}

module.exports = PasswordResetService;