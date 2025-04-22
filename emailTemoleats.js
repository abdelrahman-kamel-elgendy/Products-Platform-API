const fs = require('fs');
const path = require('path');
const juice = require('juice'); // For CSS inlining

class EmailTemplates {
    constructor() {
        this.templatesDir = path.join(__dirname, 'WWW');
    }

    async loadTemplate(templateName, variables) {
        // Load HTML template
        const htmlPath = path.join(this.templatesDir, 'resetPasswordEmail.html');
        let html = fs.readFileSync(htmlPath, 'utf8');

        // Load CSS
        const cssPath = path.join(this.templatesDir, 'resetPasswordEmail.css');
        const css = fs.readFileSync(cssPath, 'utf8');

        // Load text version
        const textPath = path.join(this.templatesDir, 'resetPasswordEmail.txt');
        let text = fs.readFileSync(textPath, 'utf8');

        // Replace variables
        for (const [key, value] of Object.entries(variables)) {
            const regex = new RegExp(`{{${key}}}`, 'g');
            html = html.replace(regex, value);
            text = text.replace(regex, value);
        }

        // Inline CSS
        html = juice.inlineContent(html, css);

        return {
            html,
            text
        };
    }
}

module.exports = new EmailTemplates();