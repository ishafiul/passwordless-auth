"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const schema_1 = __importDefault(require("./schema"));
const utils_1 = require("../../utils/utils");
class OtpService {
    async createOtp(data, callback) {
        const newOtp = new schema_1.default({
            otp: data.otp,
            email: data.email,
            isExpired: false,
            deviceUuId: data.deviceUuid,
            userId: data.userId,
            expiredAt: (0, utils_1.addMinutesToDate)(new Date(), 5).toISOString()
        });
        await newOtp.save(callback);
    }
    findActiveOtpByEmail(email, callback) {
        schema_1.default.findOne({
            email,
            isExpired: false
        }, callback);
    }
    async findValidOtp(email, deviceUuId, callback) {
        schema_1.default.findOne({
            email,
            deviceUuId,
            isExpired: false
        }, callback);
    }
    async expireOldOtp(email, callback) {
        await schema_1.default.updateMany({
            email, isExpired: false
        }, {
            isExpired: true
        }, {
            returnOriginal: false
        }, callback);
    }
}
exports.OtpService = OtpService;
//# sourceMappingURL=servic.js.map