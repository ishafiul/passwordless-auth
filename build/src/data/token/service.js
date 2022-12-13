"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const schema_2 = __importDefault(require("./schema"));
const jsonwebtoken_1 = require("jsonwebtoken");
class TokenService {
    async createToken(data, callback) {
        const newToken = new schema_2.default({
            userId: data.userId,
            email: data.email,
            deviceUuId: data.deviceUuId,
            isExpired: false,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken
        });
        await newToken.save(callback);
    }
    async findActiveToken(refreshToken, deviceUuId, callback) {
        await schema_1.default.findOne({
            refreshToken,
            deviceUuId,
            isExpired: false
        }, callback).clone();
    }
    async expireOldTokens(email, callback) {
        await schema_1.default.updateMany({
            email, isExpired: false
        }, {
            isExpired: true
        }, {
            returnOriginal: false
        }, callback).clone();
    }
    verifyRefreshToken(refreshToken, callback) {
        (0, jsonwebtoken_1.verify)(refreshToken, process.env.TOKEN_SECRET_REFRESH || '', callback);
    }
    verifyAccessToken(refreshToken, callback) {
        (0, jsonwebtoken_1.verify)(refreshToken, process.env.TOKEN_SECRET || '', callback);
    }
    generateAccessToken(user) {
        return (0, jsonwebtoken_1.sign)(user, process.env.TOKEN_SECRET || '', { expiresIn: '1m' });
    }
    generateRefreshToken(user) {
        return (0, jsonwebtoken_1.sign)(user, process.env.TOKEN_SECRET_REFRESH || '', { expiresIn: '5m' });
    }
}
exports.default = TokenService;
//# sourceMappingURL=service.js.map