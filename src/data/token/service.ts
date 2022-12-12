import TokenSchema from "./schema";
import Token from "./schema";
import {JwtPayload, sign, verify, VerifyErrors} from "jsonwebtoken";
import {CallbackError} from "mongoose";
import {SaveToken} from "./models";

export default class TokenService {
    public async createToken(data: SaveToken, callback?: (error: CallbackError, result: any) => any) {
        const newToken = new Token({
            userId: data.userId,
            email: data.email,
            deviceUuId: data.deviceUuId,
            isExpired: false,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken
        })
        await newToken.save(callback!);
    }

    public async findActiveToken(accessToken?: string, refreshToken?: string, deviceUuId?: string, callback?: (error: CallbackError, result: any) => any) {
        await TokenSchema.findOne({
            accessToken,
            refreshToken,
            deviceUuId,
            isExpired: false
        }, callback).clone()
    }

    public async expireOldTokens(email: string, callback?: (error: CallbackError, result: any) => any) {
        await TokenSchema.updateMany({
            email, isExpired: false
        }, {
            isExpired: true
        }, {
            returnOriginal: false
        }, callback).clone()
    }

    public verifyRefreshToken(refreshToken: string, callback: (err: VerifyErrors | null, data: string | JwtPayload | undefined) => any) {
        verify(refreshToken, process.env.TOKEN_SECRET_REFRESH || '', callback)
    }

    public verifyAccessToken(refreshToken: string, callback: (err: VerifyErrors | null, data: string | JwtPayload | undefined) => any) {
        verify(refreshToken, process.env.TOKEN_SECRET || '', callback)
    }

    public generateAccessToken(user: string | object) {
        return sign(user, process.env.TOKEN_SECRET || '', {expiresIn: '1m'})
    }

    public generateRefreshToken(user: string | object | Buffer) {
        return sign(user, process.env.TOKEN_SECRET_REFRESH || '', {expiresIn: '2m'})
    }

}