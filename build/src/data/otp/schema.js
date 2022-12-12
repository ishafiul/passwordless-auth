"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OtpSchema = new mongoose_1.Schema({
    otp: {
        type: String,
        required: true,
    },
    deviceUuId: {
        type: String,
        required: true,
    },
    isExpired: {
        type: Boolean,
        required: true,
    },
    expiredAt: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        unique: true
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("otp", OtpSchema);
//# sourceMappingURL=schema.js.map