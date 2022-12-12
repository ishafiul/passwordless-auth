import { Response } from "express";
import { RefreshToken } from "../data/token/models";
import { Device } from "../data/common/models";
import { OtpReq } from "../data/otp/models";
export declare class AuthController {
    private tokenService;
    private userService;
    private otpService;
    private emailTemplate;
    private mailService;
    createDeviceUuid(req: {
        body: Device;
    }, res: Response): void;
    requestOtp(req: {
        body: OtpReq;
    }, res: Response): Promise<void>;
    verifyOtp(req: {
        body: OtpReq;
    }, res: Response): Promise<void>;
    refreshToken(req: {
        body: RefreshToken;
    }, res: Response): Promise<void>;
    private saveToken;
}
