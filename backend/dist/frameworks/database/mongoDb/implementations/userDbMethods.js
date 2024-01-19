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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDbMethods = void 0;
const userSchema_1 = require("../model/userSchema");
const otpSchema_1 = require("../model/otpSchema");
const userDbMethods = () => {
    const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
        return yield userSchema_1.User.create(user);
    });
    const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userSchema_1.User.findOne({ email: email });
        return user;
    });
    const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield userSchema_1.User.findOne({ _id: id });
    });
    const saveUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userSchema_1.User.findById({ _id: req.user._id });
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.password = req.body.password || user.password;
            return yield user.save();
        }
    });
    const forgotPassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userSchema_1.User.findOne({ email: email });
        if (!user) {
            return { success: false, error: "user not found" };
        }
        else {
            const userDoc = user;
            console.log(password, 'before');
            userDoc.password = password;
            console.log(userDoc.password, 'after');
            yield userDoc.save();
            return { success: true, message: "passowrd changed succesfully" };
        }
    });
    const saveOTP = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userSchema_1.User.findOne({ email: email });
        if (user) {
            const userEmail = user.email;
            console.log(userEmail);
            const newOtp = new otpSchema_1.OTP({ userEmail: userEmail, otp: otp });
            yield newOtp.save();
            console.log(newOtp);
        }
    });
    const findOtpUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield otpSchema_1.OTP.findOne({ userEmail: email });
        if (user) {
            return user.otp;
        }
        else {
            throw new Error('user not found');
        }
    });
    return {
        addUser,
        findByEmail,
        findById,
        saveUser,
        forgotPassword,
        saveOTP,
        findOtpUser
    };
};
exports.userDbMethods = userDbMethods;
