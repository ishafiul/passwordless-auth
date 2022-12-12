import {CallbackError} from "mongoose";
import OtpSchema from "./schema";
import {addMinutesToDate} from "../../utils/utils";
import {Otp} from "./models";

export class OtpService {

    public async createOtp(data: Otp, callback?: (error: CallbackError, result: any) => any) {
        const newOtp = new OtpSchema({
            otp: data.otp,
            email: data.email,
            isExpired: false,
            deviceUuId: data.deviceUuid,
            userId: data.userId,
            expiredAt: addMinutesToDate(new Date(), 5).toISOString()
        })
        await newOtp.save(callback!);
    }

    public async findActiveOtpByEmail(email: string, callback?: (error: CallbackError, result: any) => any) {
        await OtpSchema.findOne({
            email,
            isExpired: false
        }, callback).clone();
    }

    public async findValidOtp(email: string, deviceUuId: string, callback?: (error: CallbackError, result: any) => any) {
        await OtpSchema.findOne({
            email,
            deviceUuId,
            isExpired: false
        }, callback).clone();
    }

    public async expireOldOtp(email: string, callback?: (error: CallbackError, result: any) => any) {
        await OtpSchema.updateMany({
            email, isExpired: false
        }, {
            isExpired: true
        }, {
            returnOriginal: false
        }, callback).clone()
    }
}