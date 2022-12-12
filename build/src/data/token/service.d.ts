/// <reference types="node" />
import { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { CallbackError } from "mongoose";
import { SaveToken } from "./models";
export default class TokenService {
    createToken(data: SaveToken, callback: (error: CallbackError, result: any) => any): Promise<void>;
    findActiveToken(accessToken?: string, refreshToken?: string, deviceUuId?: string, callback?: (error: CallbackError, result: any) => any): Promise<void>;
    expireOldTokens(email: string, callback: (error: CallbackError, result: any) => any): Promise<void>;
    verifyRefreshToken(refreshToken: string, callback: (err: VerifyErrors | null, data: string | JwtPayload | undefined) => any): void;
    verifyAccessToken(refreshToken: string, callback: (err: VerifyErrors | null, data: string | JwtPayload | undefined) => any): void;
    generateAccessToken(user: string | object): string;
    generateRefreshToken(user: string | object | Buffer): string;
}
