export type OtpReq = {
    otp: string;
    email: string;
    deviceUuid: string;
};
export type OtpVerify = {
    otp: string;
    email: string;
    deviceUuid: string;
};
export type Otp = {
    email: string;
    userId?: string;
    deviceUuid: string;
    otp: string;
};
