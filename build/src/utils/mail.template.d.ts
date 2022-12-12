export declare class EmailTemplate {
    otp(otp: string, type: EmailType): string;
}
export declare enum EmailType {
    LOGIN = 0,
    SIGNUP = 1
}
