const nodemailer = require('nodemailer');
require('dotenv').config(); // Make sure to load .env file

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    async sendMail(mailOptions) {
        try {
            const info = await this.transporter.sendMail({
                from: ` ${process.env.EMAIL_FROM} <${process.env.EMAIL_USER}>`,
                ...mailOptions
            });
            return info;
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error(error);
        }
    }
}

module.exports = EmailService;