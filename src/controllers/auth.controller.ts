import {Response} from "express";
import {
    badRequest,
    createdResponse,
    failureResponse,
    mongoError,
    somethingWrong,
    successResponse
} from "../data/common/response.service";
import {RefreshToken, TokenData} from "../data/token/models";
import TokenService from "../data/token/service";
import {Device} from "../data/common/models";
import {AES, enc} from "crypto-js";
import {OtpReq, OtpVerify} from "../data/otp/models";
import {isDateExpired} from "../utils/utils";
import UserService from "../data/user/service";
import {OtpService} from "../data/otp/servic";

export class AuthController {

    private tokenService: TokenService = new TokenService();
    private userService: UserService = new UserService();
    private otpService: OtpService = new OtpService();
   // private emailTemplate: EmailTemplate = new EmailTemplate();
   // private mailService: MailService = new MailService();

    public createDeviceUuid(req: { body: Device; }, res: Response) {
        try {
            const reqBody: Device = req.body
            const deviceUuId = AES.encrypt(JSON.stringify({reqBody}), process.env.HASH_KEY!).toString();
            createdResponse('device uuid created successfully', {
                deviceUuId
            }, res)
        } catch (err) {
            somethingWrong(err, res)
        }
    }

    public async requestOtp(req: { body: OtpReq }, res: Response) {
        try {
            const reqBody: OtpReq = req.body
            // let isUserExist: boolean = false;
           // const userId: string = ''
            const user = await this.userService.findUserByEmail(reqBody.email)
            // tslint:disable-next-line:no-console
            console.log(user)
            await this.otpService.findActiveOtpByEmail(reqBody.email, async (activeOtpError) => {
                if (!activeOtpError) {
                   await this.otpService.expireOldOtp(reqBody.email, async (error) => {
                        if (error) {
                            mongoError(req, res)
                        }
                    })
                } else {
                    mongoError(activeOtpError, res);
                }
            })
            const DeviceUuIdBytes = AES.decrypt(reqBody.deviceUuid, process.env.HASH_KEY!);
            const isDeviceUuId = DeviceUuIdBytes.toString(enc.Utf8);


            if (!isDeviceUuId) {
                badRequest("Device UuId is not valid", res)
            }/* else {
                const otpCode = generateOtp(5)
                if (!isUserExist) {
                    const htmlMessage: string = this.emailTemplate.otp(otpCode, EmailType.SIGNUP);
                    const textMessage = `Your SignUp Otp is : ${otpCode}`
                    const isEMailSend = await this.mailService.sendEmail(reqBody.email, `SignUp Otp - CrossRoad`, textMessage, htmlMessage)
                    if (isEMailSend) {
                        await this.otpService.createOtp({
                            otp: otpCode,
                            email: reqBody.email,
                            deviceUuid: reqBody.deviceUuid,
                        }, (error) => {
                            if (!error) {
                                createdResponse('Signup Otp Send', '', res)
                            } else {
                                mongoError(error, res);
                            }
                        })
                    } else {
                        failureResponse('Cant send email', '', res)
                    }
                } else {
                    const htmlMessage: string = this.emailTemplate.otp(otpCode, EmailType.LOGIN);
                    const textMessage = `Your Login Otp is : ${otpCode}`
                    const isEMailSend = await this.mailService.sendEmail(reqBody.email, `Login Otp - CrossRoad`, textMessage, htmlMessage)
                    if (isEMailSend) {
                        await this.otpService.createOtp({
                            otp: otpCode,
                            email: reqBody.email,
                            userId,
                            deviceUuid: reqBody.deviceUuid,
                        }, (error) => {
                            if (!error) {
                                createdResponse('Login Otp Send', '', res)
                            } else {
                                mongoError(error, res);
                            }
                        })
                    } else {
                        failureResponse('Cant send email', '', res)
                    }
                }
            }*/
        } catch (err) {
            somethingWrong(err, res);
        }
    }

    public async verifyOtp(req: { body: OtpReq }, res: Response) {
        try {
            const reqBody: OtpVerify = req.body

            await this.otpService.findValidOtp(reqBody.email, reqBody.deviceUuid, async (validOtpError, validOtpResult) => {
                if (validOtpError) {
                    mongoError(validOtpError, res);
                } else {
                    if (!validOtpResult) {
                        badRequest('no valid otp found for this email and device id', res)
                    } else {
                        if (isDateExpired(validOtpResult.expiredAt)) {
                            await this.otpService.expireOldOtp(reqBody.email, (expireOldOtpError) => {
                                if (expireOldOtpError) {
                                    mongoError(expireOldOtpError, res);
                                } else {
                                    badRequest('Otp Expired', res)
                                }
                            })
                        } else {
                            if (validOtpResult.otp === reqBody.otp) {
                                if (!validOtpResult.userId) {
                                    await this.userService.createUser(reqBody.email, async (createUserError, _) => {
                                        if (!createUserError) {
                                            await this.otpService.expireOldOtp(reqBody.email, (expireOldOtpError, __) => {
                                                if (!expireOldOtpError) {
                                                    this.userService.findUserByEmail(reqBody.email, (UserFoundError, result) => {
                                                        if (UserFoundError) {
                                                            mongoError(UserFoundError, res);
                                                        } else {
                                                            this.saveToken({
                                                                    userId: result.userId,
                                                                    email: reqBody.email,
                                                                    deviceUuId: reqBody.deviceUuid
                                                                }, res
                                                            )
                                                        }

                                                    })
                                                } else {
                                                    mongoError(expireOldOtpError, res);
                                                }
                                            })
                                        } else {
                                            mongoError(createUserError, res);
                                        }
                                    })
                                } else {
                                    await this.otpService.expireOldOtp(reqBody.email, (expireOldOtpError, __) => {
                                        if (expireOldOtpError) {
                                            mongoError(expireOldOtpError, res);
                                        } else {
                                            this.saveToken({
                                                    userId: validOtpResult.userId,
                                                    email: reqBody.email,
                                                    deviceUuId: reqBody.deviceUuid
                                                }, res
                                            )
                                        }
                                    })
                                }

                            } else {
                                failureResponse('OTP did not match', '', res)
                            }
                        }
                    }
                }
            })
        } catch (err) {
            res.status(400).json(err);
        }
    }

    public async refreshToken(req: { body: RefreshToken; }, res: Response) {
        try {
            const refreshToken = req.body.refreshToken
            await this.tokenService.findActiveToken('', refreshToken, req.body.deviceUuId, (error) => {
                if (!error) {
                    this.tokenService.verifyRefreshToken(refreshToken, async (err, data: any) => {
                        if (!err) {
                            await this.saveToken({
                                userId: data.userId,
                                email: data.email,
                                deviceUuId: req.body.deviceUuId
                            }, res)
                        }
                    });
                } else {
                    mongoError(error, res);
                }
            })

        } catch (err) {
            somethingWrong(err, res);
        }
    }

    private async saveToken(data: TokenData, res: Response): Promise<void> {
        try {
            const accessToken = this.tokenService.generateAccessToken({
                userId: data.userId,
                email: data.email,
            })
            const refreshToken = this.tokenService.generateRefreshToken({
                userId: data.userId,
                email: data.email,
            })
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
                            successResponse('Token Created Successfully!', saveResult, res)
                        } else {
                            mongoError(saveError, res);
                        }
                    })
                } else {
                    mongoError(error, res);
                }
            })

        } catch (e) {
            somethingWrong(e, res);
        }
    }
}