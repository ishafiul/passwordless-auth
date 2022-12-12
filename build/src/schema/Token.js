"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Token = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    deviceUuId: {
        type: String,
        required: true,
        unique: true
    },
    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Token", Token);
//# sourceMappingURL=Token.js.map