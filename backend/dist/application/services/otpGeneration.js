"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../frameworks/database/mongoDb/config");
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendOTP = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: 'Gmail',
        auth: {
            user: config_1.configKeys.MAIL_USERNAME,
            pass: config_1.configKeys.MAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    const otp = Math.floor(Math.random() * 10000);
    const mailOptions = {
        from: 'arjarjun2004@gmail.com',
        to: `${email}`,
        subject: 'Reset password -UpLift',
        text: `Your OTP for changing password is ${otp}`,
    };
    try {
        yield transporter.sendMail(mailOptions);
        return otp;
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
});
exports.default = sendOTP;
