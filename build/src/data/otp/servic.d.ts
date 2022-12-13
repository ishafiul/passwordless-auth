import { CallbackError } from "mongoose";
import { Otp } from "./models";
export declare class OtpService {
    createOtp(data: Otp, callback?: (error: CallbackError, result: any) => any): Promise<void>;
    findActiveOtpByEmail(email: string, callback?: (error: CallbackError, result: any) => any): Promise<void>;
    findValidOtp(email: string, deviceUuId: string, callback?: (error: CallbackError, result: any) => any): Promise<void>;
    expireOldOtp(email: string, callback?: (error: CallbackError, result: any) => any): Promise<void>;
}
