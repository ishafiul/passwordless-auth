import {Router} from "express";
import {config} from "dotenv";
import {OtpReq, OtpVerify} from "../data/otp/models";
import {RefreshToken} from "../data/token/models";
import {Device} from "../data/common/models";
import {AuthController} from "../controllers/auth.controller";

const router = Router();

config();

const authController = new AuthController();

router.post('/create-device-uuid', (req: { body: Device; }, res: any) => {
    authController.createDeviceUuid(req, res)
})


router.post('/req-otp', async (req: { body: OtpReq }, res: any) => {
    await authController.requestOtp(req, res);
})

router.post('/verify-otp', async (req: { body: OtpVerify }, res: any) => {
    await authController.verifyOtp(req, res);
})

router.post('/refresh-token', async (req: { body: RefreshToken; }, res) => {
    await authController.refreshToken(req, res);
})

export {router as AuthRouter};