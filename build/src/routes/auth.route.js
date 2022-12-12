"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const dotenv_1 = require("dotenv");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
exports.AuthRouter = router;
(0, dotenv_1.config)();
const authController = new auth_controller_1.AuthController();
router.post('/create-device-uuid', (req, res) => {
    authController.createDeviceUuid(req, res);
});
router.post('/req-otp', async (req, res) => {
    await authController.requestOtp(req, res);
});
router.post('/verify-otp', async (req, res) => {
    await authController.verifyOtp(req, res);
});
router.post('/refresh-token', async (req, res) => {
    await authController.refreshToken(req, res);
});
//# sourceMappingURL=auth.route.js.map