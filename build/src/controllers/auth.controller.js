"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const response_service_1 = require("../data/common/response.service");
const service_1 = __importDefault(require("../data/token/service"));
const crypto_js_1 = require("crypto-js");
const utils_1 = require("../utils/utils");
const service_2 = __importDefault(require("../data/user/service"));
const servic_1 = require("../data/otp/servic");
const mail_template_1 = require("../utils/mail.template");
const mail_service_1 = require("../data/common/mail.service");
class AuthController {
    constructor() {
        this.tokenService = new service_1.default();
        this.userService = new service_2.default();
        this.otpService = new servic_1.OtpService();
        this.emailTemplate = new mail_template_1.EmailTemplate();
        this.mailService = new mail_service_1.MailService();
    }
    createDeviceUuid(req, res) {
        try {
            const reqBody = req.body;
            const deviceUuId = crypto_js_1.AES.encrypt(JSON.stringify({ reqBody }), process.env.HASH_KEY).toString();
            (0, response_service_1.createdResponse)('device uuid created successfully', {
                deviceUuId
            }, res);
        }
        catch (err) {
            (0, response_service_1.somethingWrong)(err, res);
        }
    }
    async requestOtp(req, res) {
        try {
            const reqBody = req.body;
            let isUserExist = false;
            let userId = '';
            await this.userService.findUserByEmail(reqBody.email, (error, result) => {
                isUserExist = !error;
                if (!error) {
                    userId = result.userId;
                }
            });
            await this.otpService.findActiveOtpByEmail(reqBody.email, (activeOtpError) => {
                if (!activeOtpError) {
                    this.otpService.expireOldOtp(reqBody.email, (error) => {
                        if (error) {
                            (0, response_service_1.mongoError)(req, res);
                        }
                    });
                }
                else {
                    (0, response_service_1.mongoError)(activeOtpError, res);
                }
            });
            const DeviceUuIdBytes = crypto_js_1.AES.decrypt(reqBody.deviceUuid, process.env.HASH_KEY);
            const isDeviceUuId = DeviceUuIdBytes.toString(crypto_js_1.enc.Utf8);
            if (!isDeviceUuId) {
                (0, response_service_1.badRequest)("Device UuId is not valid", res);
            }
            else {
                const otpCode = (0, utils_1.generateOtp)(5);
                if (!isUserExist) {
                    const htmlMessage = this.emailTemplate.otp(otpCode, mail_template_1.EmailType.SIGNUP);
                    const textMessage = `Your SignUp Otp is : ${otpCode}`;
                    const isEMailSend = await this.mailService.sendEmail(reqBody.email, `SignUp Otp - CrossRoad`, textMessage, htmlMessage);
                    if (isEMailSend) {
                        await this.otpService.createOtp({
                            otp: otpCode,
                            email: reqBody.email,
                            deviceUuid: reqBody.deviceUuid,
                        }, (error) => {
                            if (!error) {
                                (0, response_service_1.createdResponse)('Signup Otp Send', '', res);
                            }
                            else {
                                (0, response_service_1.mongoError)(error, res);
                            }
                        });
                    }
                    else {
                        (0, response_service_1.failureResponse)('Cant send email', '', res);
                    }
                }
                else {
                    const htmlMessage = this.emailTemplate.otp(otpCode, mail_template_1.EmailType.LOGIN);
                    const textMessage = `Your Login Otp is : ${otpCode}`;
                    const isEMailSend = await this.mailService.sendEmail(reqBody.email, `Login Otp - CrossRoad`, textMessage, htmlMessage);
                    if (isEMailSend) {
                        await this.otpService.createOtp({
                            otp: otpCode,
                            email: reqBody.email,
                            userId,
                            deviceUuid: reqBody.deviceUuid,
                        }, (error) => {
                            if (!error) {
                                (0, response_service_1.createdResponse)('Login Otp Send', '', res);
                            }
                            else {
                                (0, response_service_1.mongoError)(error, res);
                            }
                        });
                    }
                    else {
                        (0, response_service_1.failureResponse)('Cant send email', '', res);
                    }
                }
            }
        }
        catch (err) {
            (0, response_service_1.somethingWrong)(err, res);
        }
    }
    async verifyOtp(req, res) {
        try {
            const reqBody = req.body;
            await this.otpService.findValidOtp(reqBody.email, reqBody.deviceUuid, async (validOtpError, validOtpResult) => {
                if (validOtpError) {
                    (0, response_service_1.mongoError)(validOtpError, res);
                }
                else {
                    if (!validOtpResult) {
                        (0, response_service_1.badRequest)('no valid otp found for this email and device id', res);
                    }
                    else {
                        if ((0, utils_1.isDateExpired)(validOtpResult.expiredAt)) {
                            await this.otpService.expireOldOtp(reqBody.email, (expireOldOtpError) => {
                                if (expireOldOtpError) {
                                    (0, response_service_1.mongoError)(expireOldOtpError, res);
                                }
                                else {
                                    (0, response_service_1.badRequest)('Otp Expired', res);
                                }
                            });
                        }
                        else {
                            if (validOtpResult.otp === reqBody.otp) {
                                if (!validOtpResult.userId) {
                                    await this.userService.createUser(reqBody.email, async (createUserError, _) => {
                                        if (!createUserError) {
                                            await this.otpService.expireOldOtp(reqBody.email, (expireOldOtpError, __) => {
                                                if (!expireOldOtpError) {
                                                    this.userService.findUserByEmail(reqBody.email, (UserFoundError, result) => {
                                                        if (UserFoundError) {
                                                            (0, response_service_1.mongoError)(UserFoundError, res);
                                                        }
                                                        else {
                                                            this.saveToken({
                                                                userId: result.userId,
                                                                email: reqBody.email,
                                                                deviceUuId: reqBody.deviceUuid
                                                            }, res);
                                                        }
                                                    });
                                                }
                                                else {
                                                    (0, response_service_1.mongoError)(expireOldOtpError, res);
                                                }
                                            });
                                        }
                                        else {
                                            (0, response_service_1.mongoError)(createUserError, res);
                                        }
                                    });
                                }
                                else {
                                    await this.otpService.expireOldOtp(reqBody.email, (expireOldOtpError, __) => {
                                        if (expireOldOtpError) {
                                            (0, response_service_1.mongoError)(expireOldOtpError, res);
                                        }
                                        else {
                                            this.saveToken({
                                                userId: validOtpResult.userId,
                                                email: reqBody.email,
                                                deviceUuId: reqBody.deviceUuid
                                            }, res);
                                        }
                                    });
                                }
                            }
                            else {
                                (0, response_service_1.failureResponse)('OTP did not match', '', res);
                            }
                        }
                    }
                }
            });
        }
        catch (err) {
            res.status(400).json(err);
        }
    }
    async refreshToken(req, res) {
        try {
            const refreshToken = req.body.refreshToken;
            await this.tokenService.findActiveToken('', refreshToken, req.body.deviceUuId, (error) => {
                if (!error) {
                    this.tokenService.verifyRefreshToken(refreshToken, async (err, data) => {
                        if (!err) {
                            await this.saveToken({
                                userId: data.userId,
                                email: data.email,
                                deviceUuId: req.body.deviceUuId
                            }, res);
                        }
                    });
                }
                else {
                    (0, response_service_1.mongoError)(error, res);
                }
            });
        }
        catch (err) {
            (0, response_service_1.somethingWrong)(err, res);
        }
    }
    async saveToken(data, res) {
        try {
            const accessToken = this.tokenService.generateAccessToken({
                userId: data.userId,
                email: data.email,
            });
            const refreshToken = this.tokenService.generateRefreshToken({
                userId: data.userId,
                email: data.email,
            });
            await this.tokenService.expireOldTokens(data.email, async (error) => {
                if (!error) {
                    await this.tokenService.createToken({
                        userId: data.userId,
                        email: data.email,
                        deviceUuId: data.deviceUuId,
                        accessToken,
                        refreshToken
                    }, (saveError, saveResult) => {
                        if (!saveError) {
                            (0, response_service_1.successResponse)('Token Created Successfully!', saveResult, res);
                        }
                        else {
                            (0, response_service_1.mongoError)(saveError, res);
                        }
                    });
                }
                else {
                    (0, response_service_1.mongoError)(error, res);
                }
            });
        }
        catch (e) {
            (0, response_service_1.somethingWrong)(e, res);
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map