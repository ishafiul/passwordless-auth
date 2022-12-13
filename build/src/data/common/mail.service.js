"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class MailService {
    async sendEmail(to, subject, message, htmlMessage) {
        const nodemailer = require("nodemailer");
        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com", port: 587, secure: false, auth: {
                    user: '17182103210@cse.bubt.edu.bd', pass: process.env.MAIL_PASS
                },
            });
            await transporter.sendMail({
                from: "17182103210@cse.bubt.edu.bd",
                to,
                subject,
                text: message,
                html: htmlMessage,
            });
            return true;
        }
        catch (e) {
            return false;
        }
    }
}
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map