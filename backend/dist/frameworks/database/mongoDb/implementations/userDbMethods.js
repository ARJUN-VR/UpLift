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
const basicSchema_1 = require("../model/campaign/basicSchema");
const paymentSchema_1 = require("../model/paymentSchema");
const mongodb_1 = require("mongodb");
const chatSchema_1 = require("../model/chatSchema");
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
            user.name = req.body.editName || user.name;
            user.email = req.body.editEmail || user.email;
            user.password = req.body.password || user.password;
            user.image = req.body.image || user.image;
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
    const pledge = (campaignId, payment, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield paymentSchema_1.Payment.create({ campaignId, payment, userEmail });
            return yield basicSchema_1.Basics.findOneAndUpdate({ _id: campaignId }, { $inc: { currentAmount: payment, backers: 1 } }, { new: true });
        }
        catch (error) {
            console.log(error);
        }
    });
    const fetchChannelsId = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield paymentSchema_1.Payment.find({ userEmail: userEmail }, { _id: 0, campaignId: 1 });
        }
        catch (error) {
            console.log(error);
        }
    });
    const fetchChannelData = (campaignId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = new mongodb_1.ObjectId(campaignId);
            return yield basicSchema_1.Basics.aggregate([
                {
                    $match: { _id: id },
                },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        image: 1
                    }
                }
            ]);
        }
        catch (error) {
            console.log(error);
        }
    });
    const saveChat = (chat) => __awaiter(void 0, void 0, void 0, function* () {
        return yield chatSchema_1.Chat.create(chat);
    });
    const getChats = (campaignId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield chatSchema_1.Chat.find({ campaignId });
    });
    return {
        addUser,
        findByEmail,
        findById,
        saveUser,
        forgotPassword,
        saveOTP,
        findOtpUser,
        pledge,
        fetchChannelsId,
        fetchChannelData,
        saveChat,
        getChats
    };
};
exports.userDbMethods = userDbMethods;
