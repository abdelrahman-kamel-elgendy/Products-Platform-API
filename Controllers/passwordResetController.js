class PasswordResetController {
    constructor(passwordResetService) {
        this.passwordResetService = passwordResetService;
    }

    async forgotPassword(req, res, next) {
        try {
            const email = req.body.email;
            const token = await this.passwordResetService.generateResetToken(email);
            await this.passwordResetService.sendResetEmail(email, token, req.headers.host);

            res.cookie('resetToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3600000
            });

            res.status(200).json({
                message: 'Password reset email sent'
            });
        } catch (error) {
            next(error);
        }
    }

    async resetPassword(req, res, next) {
        try {
            const { token, newPassword } = req.body;

            const user = await this.passwordResetService.resetPassword(token, newPassword);

            // Clear reset cookie
            res.clearCookie('resetToken');

            res.status(200).json({
                message: 'Password reset successful',
                user
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = PasswordResetController;