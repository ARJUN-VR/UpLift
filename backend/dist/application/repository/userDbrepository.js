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
exports.userDbInterface = void 0;
const userDbInterface = (repository) => {
    const adduser = (user) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository.addUser(user);
        }
        catch (error) {
            console.error("Error adding user:", error);
            throw new Error("Error adding user");
        }
    });
    const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield repository.findByEmail(email);
            return user;
        }
        catch (error) {
            console.error("Error ", error);
            throw new Error("Error finding user by email");
        }
    });
    const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository.findById(id);
        }
        catch (error) {
            console.error("Error ", error);
            throw new Error("Error finding user by id");
        }
    });
    const saveUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository.saveUser(req);
        }
        catch (error) {
            console.error("Error", error);
            throw new Error("Error saving user");
        }
    });
    const forgotPassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository.forgotPassword(email, password);
        }
        catch (error) {
            console.error("Error", error);
            throw new Error("Error forgot password");
        }
    });
    const saveOtp = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield repository.saveOTP(email, otp);
        }
        catch (error) {
            console.error("Error ", error);
            throw new Error("Error saving OTP");
        }
    });
    const findOtpUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository.findOtpUser(email);
        }
        catch (error) {
            console.error("Error finding user:", error);
            throw new Error("Error finding  user");
        }
    });
    const pledge = (campaignId, payment, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository.pledge(campaignId, payment, userEmail);
        }
        catch (error) {
            console.error("Error pledging:", error);
            throw new Error("Error pledging");
        }
    });
    const fetchChannelsId = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository.fetchChannelsId(userEmail);
        }
        catch (error) {
            console.error("Error fetching channels", error);
            throw new Error("Error fetching channels ");
        }
    });
    const fetchChannelData = (campaignId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository.fetchChannelData(campaignId);
        }
        catch (error) {
            console.error("Error fetching channel data:", error);
            throw new Error("Error fetching channel data");
        }
    });
    const saveChat = (chat) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository.saveChat(chat);
        }
        catch (error) {
            console.error("Error saving chat:", error);
            throw new Error("Error saving chat");
        }
    });
    const getChats = (campaignId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository.getChats(campaignId);
        }
        catch (error) {
            console.error("Error getting chats:", error);
            throw new Error("Error getting chats");
        }
    });
    return {
        adduser,
        findByEmail,
        findById,
        saveUser,
        forgotPassword,
        saveOtp,
        findOtpUser,
        pledge,
        fetchChannelsId,
        fetchChannelData,
        saveChat,
        getChats
    };
};
exports.userDbInterface = userDbInterface;
