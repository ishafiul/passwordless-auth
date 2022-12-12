import {config} from "dotenv";
config();
export class MailService {
    public async sendEmail(to: string, subject: string, message: string, htmlMessage: string): Promise<boolean> {
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
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.log(e)
            return false;
        }
    }
}
