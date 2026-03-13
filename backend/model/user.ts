import { Schema, model } from "mongoose";
import { UserProps } from "../types";

const UserSchema = new Schema<UserProps>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ""
    },
    created: {
        type: Date,
        default: Date.now
    },
    // OTP fields
    // otp: {
    //     type: String,
    //     default: null
    // },

    // otpExpiry: {
    //     type: Date,
    //     default: null
    // },

    // isVerified: {
    //     type: Boolean,
    //     default: false
    // }
});

export default model<UserProps>("User", UserSchema);
