export declare class MailService {
    sendEmail(to: string, subject: string, message: string, htmlMessage: string): Promise<boolean>;
}
