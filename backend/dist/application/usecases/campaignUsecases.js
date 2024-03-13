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
exports.campaignUsecase = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const socketService_1 = require("../services/socketService");
const app_1 = require("../../app");
const campaignUsecase = (repository) => {
    const listCampaigns = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.listCampaigns();
    });
    const createBasics = (basics) => __awaiter(void 0, void 0, void 0, function* () {
        const count = yield repository.getNotificationCount();
        let newCount = 0;
        if (count) {
            newCount = count + 1;
        }
        (0, socketService_1.emitEventToClient)(app_1.io, 'notification', newCount);
        return yield repository.createBasics(basics);
    });
    const createAdvanced = (advanced) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.createAdvanced(advanced);
    });
    const uploadImage = (imgUrl) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield cloudinary_1.default.v2.uploader.upload(imgUrl);
        }
        catch (error) {
            console.log(error, "error in image uplaoding usecase");
        }
    });
    const videoUpload = (videoUrl) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield cloudinary_1.default.v2.uploader.upload(videoUrl, {
                resource_type: "video",
            });
        }
        catch (error) {
            console.log(error, "error in video uploader");
        }
    });
    const createReward = (reward) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.createReward(reward);
    });
    const getCampaign = (id) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(id, 'usecase');
        return yield repository.getCampaign(id);
    });
    const getCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getCategory(category);
    });
    const addComment = (commentData) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.addComment(commentData);
    });
    const listComments = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.listComments(id);
    });
    const getReward = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getReward(id);
    });
    const listCategory = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.listCategory();
    });
    const getDashboardData = (creatorEmail) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getDashboardData(creatorEmail);
    });
    const getPaymentData = (campaignId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getPaymentData(campaignId);
    });
    const search = (query) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.search(query);
    });
    const HandleLIve = (campaignId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.HandleLIve(campaignId);
    });
    return {
        listCampaigns,
        createBasics,
        createAdvanced,
        uploadImage,
        videoUpload,
        createReward,
        getCampaign,
        getCategory,
        addComment,
        listComments,
        getReward,
        listCategory,
        getDashboardData,
        getPaymentData,
        search,
        HandleLIve
    };
};
exports.campaignUsecase = campaignUsecase;
