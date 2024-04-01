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
        try {
            return yield userSchema_1.User.create(user);
        }
        catch (error) {
            console.error("Error adding user:", error);
            throw new Error("Error adding user");
        }
    });
    const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userSchema_1.User.findOne({ email: email });
            return user;
        }
        catch (error) {
            console.error("Error finding user by email:", error);
            throw new Error("Error finding user by email");
        }
    });
    const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield userSchema_1.User.findOne({ _id: id });
        }
        catch (error) {
            console.error("Error finding user by id:", error);
            throw new Error("Error finding user by id");
        }
    });
    const saveUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userSchema_1.User.findById({ _id: req.user._id });
            if (user) {
                user.name = req.body.editName || user.name;
                user.email = req.body.editEmail || user.email;
                user.password = req.body.password || user.password;
                user.image = req.body.image || user.image;
                return yield user.save();
            }
        }
        catch (error) {
            console.error("Error saving user:", error);
            throw new Error("Error saving user");
        }
    });
    const forgotPassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
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
                return { success: true, message: "password changed successfully" };
            }
        }
        catch (error) {
            console.error("Error changing password:", error);
            throw new Error("Error changing password");
        }
    });
    const saveOTP = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userSchema_1.User.findOne({ email: email });
            if (user) {
                const userEmail = user.email;
                console.log(userEmail);
                const newOtp = new otpSchema_1.OTP({ userEmail: userEmail, otp: otp });
                yield newOtp.save();
                console.log(newOtp);
            }
        }
        catch (error) {
            console.error("Error saving OTP:", error);
            throw new Error("Error saving OTP");
        }
    });
    const findOtpUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield otpSchema_1.OTP.findOne({ userEmail: email });
            if (user) {
                return user.otp;
            }
            else {
                throw new Error('user not found');
            }
        }
        catch (error) {
            console.error("Error finding OTP user:", error);
            throw new Error("Error finding OTP user");
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
        try {
            return yield chatSchema_1.Chat.create(chat);
        }
        catch (error) {
            console.log(error);
            throw new Error('cannot save chat');
        }
    });
    const getChats = (campaignId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield chatSchema_1.Chat.find({ campaignId });
        }
        catch (error) {
            console.log(error);
            throw new Error('cannot get chats');
        }
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
