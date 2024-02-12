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
        return yield repository.addUser(user);
    });
    const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield repository.findByEmail(email);
        return user;
    });
    const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.findById(id);
    });
    const saveUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.saveUser(req);
    });
    const forgotPassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.forgotPassword(email, password);
    });
    const saveOtp = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
        yield repository.saveOTP(email, otp);
    });
    const findOtpUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.findOtpUser(email);
    });
    const pledge = (campaignId, payment, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.pledge(campaignId, payment, userEmail);
    });
    const fetchChannelsId = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.fetchChannelsId(userEmail);
    });
    const fetchChannelData = (campaignId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.fetchChannelData(campaignId);
    });
    const saveChat = (chat) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.saveChat(chat);
    });
    const getChats = (campaignId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getChats(campaignId);
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
