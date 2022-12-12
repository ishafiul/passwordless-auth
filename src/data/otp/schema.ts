import {model, Schema} from "mongoose";


const OtpSchema = new Schema({
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
}, {timestamps: true});

export default model("otp", OtpSchema);