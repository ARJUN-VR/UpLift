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
exports.userCases = void 0;
const generateJwt_1 = __importDefault(require("../services/generateJwt"));
const otpGeneration_1 = __importDefault(require("../services/otpGeneration"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const userCases = (repository) => {
    const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.findByEmail(email); });
    const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
        const newEmail = user.email;
        const email = yield repository.findByEmail(newEmail);
        if (email) {
            return false;
        }
        else {
            return yield repository.adduser(user);
        }
    });
    const userSignIn = (email, password, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield repository.findByEmail(email);
        if (!user) {
            return { success: false, error: "no user found" };
        }
        if ('isBlocked' in user && user.isBlocked) {
            return { success: false, error: 'user blocked' };
        }
        if (user && typeof user.matchPassword === "function") {
            if (yield user.matchPassword(password)) {
                (0, generateJwt_1.default)(res, user);
                return { success: true, user };
            }
            else {
                return { success: false, error: "Incorrect password" };
            }
        }
        else {
            return { success: false, error: "Unable to verify password" };
        }
    });
    const userSignout = (res) => {
        res.cookie("accessToken", "", {
            httpOnly: true,
            expires: new Date(0),
        });
        res.cookie('refreshToken', '', {
            httpOnly: true,
            expires: new Date(0)
        });
    };
    const updateProfile = (req) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.saveUser(req);
    });
    const forgotPassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.forgotPassword(email, password);
    });
    const verifyUserAndSendOtp = (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield repository.findByEmail(email);
            if (user) {
                const otp = yield (0, otpGeneration_1.default)(email);
                yield repository.saveOtp(email, otp);
                return { success: true, message: "OTP Sent succesfully" };
            }
            else {
                return { success: false, message: "user not found" };
            }
        }
        catch (error) {
            console.log(error);
            throw new Error("OTP send failed");
        }
    });
    const verifyOtp = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const storedOtp = yield repository.findOtpUser(email);
            console.log(storedOtp, 'stored');
            console.log(otp, 'entered otp');
            if (storedOtp) {
                if (storedOtp === otp) {
                    console.log('success');
                    return { success: true, message: 'otp verified' };
                }
                else {
                    console.log('fails');
                    return { success: false, message: 'invalid otp' };
                }
            }
        }
        catch (error) {
            throw new Error('error while otp verification');
        }
    });
    const uploadImage = (imgUrl) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield cloudinary_1.default.v2.uploader.upload(imgUrl);
        }
        catch (error) {
            console.log(error, 'error in image uplaoding usecase');
        }
    });
    const videoUpload = (videoUrl) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield cloudinary_1.default.v2.uploader.upload(videoUrl, { resource_type: 'video' });
        }
        catch (error) {
            console.log(error, 'error in video uploader');
        }
    });
    const pledge = (campaignId, payment, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.pledge(campaignId, payment, userEmail);
    });
    const getChannels = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const channelIDs = yield repository.fetchChannelsId(userEmail);
            const channelData = [];
            if (channelIDs) {
                for (let id of channelIDs) {
                    const data = yield repository.fetchChannelData((_a = id.campaignId) === null || _a === void 0 ? void 0 : _a.toString());
                    channelData.push(data);
                }
            }
            return channelData;
        }
        catch (error) {
            console.log(error);
        }
    });
    const saveChat = (chat) => __awaiter(void 0, void 0, void 0, function* () {
        if (chat.image) {
            const imageRes = yield uploadImage(chat.image);
            chat.image = imageRes === null || imageRes === void 0 ? void 0 : imageRes.secure_url;
        }
        else if (chat.video) {
            const videoRes = yield cloudinary_1.default.v2.uploader.upload(chat.video, {
                resource_type: "video",
            });
            chat.video = videoRes === null || videoRes === void 0 ? void 0 : videoRes.secure_url;
        }
        return yield repository.saveChat(chat);
    });
    const getChats = (campaignId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getChats(campaignId);
    });
    return {
        findByEmail,
        addUser,
        userSignIn,
        userSignout,
        updateProfile,
        forgotPassword,
        verifyUserAndSendOtp,
        verifyOtp,
        uploadImage,
        videoUpload,
        pledge,
        getChannels,
        saveChat,
        getChats
    };
};
exports.userCases = userCases;
