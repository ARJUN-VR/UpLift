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
exports.campaignController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const campaignUsecases_1 = require("../application/usecases/campaignUsecases");
const campaignController = (dbInterface, dbImplements) => {
    const dbRepositoryCampaign = dbInterface(dbImplements());
    //desc getting basics for the homepage
    //route POST /api/user/get-campaigns
    //access public
    const listCampaigns = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const basicDetails = yield (0, campaignUsecases_1.campaignUsecase)(dbRepositoryCampaign).listCampaigns();
        console.log('basicDetails:', basicDetails);
        res.status(200).json({ basicDetails });
    }));
    //desc campaign basic details
    //route POST /api/user/create_basics
    //access private
    const createBasics = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const basicData = req.body;
        const imgRes = yield (0, campaignUsecases_1.campaignUsecase)(dbRepositoryCampaign).uploadImage(basicData.image);
        if (imgRes) {
            basicData.image = imgRes.secure_url;
        }
        const data = yield (0, campaignUsecases_1.campaignUsecase)(dbRepositoryCampaign).createBasics(basicData);
        res.status(200).json({ message: "created successfully", data });
    }));
    //desc campaign advanced details
    //route POST /api/user/create_advanced
    //access private
    const createAdvanced = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const advancedData = req.body;
        const imgRes = yield (0, campaignUsecases_1.campaignUsecase)(dbRepositoryCampaign).uploadImage(advancedData === null || advancedData === void 0 ? void 0 : advancedData.thumbnail);
        const videoRes = yield (0, campaignUsecases_1.campaignUsecase)(dbRepositoryCampaign).videoUpload(advancedData === null || advancedData === void 0 ? void 0 : advancedData.video);
        if (imgRes) {
            advancedData.thumbnail = imgRes.secure_url;
        }
        if (videoRes) {
            advancedData.video = videoRes.secure_url;
        }
        const data = yield (0, campaignUsecases_1.campaignUsecase)(dbRepositoryCampaign).createAdvanced(advancedData);
        res.status(200).json({ message: "success", data });
    }));
    //desc create reward
    //route POST /api/user/create-reward
    //access private
    const createReward = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const rewardData = req.body;
        const imgRes = yield (0, campaignUsecases_1.campaignUsecase)(dbRepositoryCampaign).uploadImage(rewardData.image);
        if (imgRes) {
            rewardData.image = imgRes.secure_url;
        }
        const reward = yield (0, campaignUsecases_1.campaignUsecase)(dbRepositoryCampaign).createReward(rewardData);
        res.status(200).json({ reward });
    }));
    //desc   fetching full campaign informations
    //route  GET  /api/user/getCampaign
    //access public
    const getCampaign = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const Id = req.params.basicId;
        console.log(Id, "iddddd");
        const campaign = yield (0, campaignUsecases_1.campaignUsecase)(dbRepositoryCampaign).getCampaign(Id);
        res.status(200).json({ campaign });
    }));
    //desc   fetching campaigns based on category
    //route  GET  /api/user/get-category
    //access public
    const getCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const category = req.params.category;
        const list = yield (0, campaignUsecases_1.campaignUsecase)(dbRepositoryCampaign).getCategory(category);
        res.status(200).json({ list });
    }));
    //desc   write comment
    //route  POST  /api/user/comment
    //access private
    const addComment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const CommentData = req.body;
        const data = yield (0, campaignUsecases_1.campaignUsecase)(dbRepositoryCampaign).addComment(CommentData);
        res.status(200).json({ data });
    }));
    //desc   fetching comments
    //route  GET  /api/user/comment
    //access public
    const listComments = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.campaignId;
        const modifiedId = id.slice(1);
        const comments = yield (0, campaignUsecases_1.campaignUsecase)(dbRepositoryCampaign).listComments(modifiedId);
        res.status(200).json({ comments });
    }));
    //desc   fetching appropriate reward
    //route  GET  /api/user/reward
    //access public
    const getReward = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.basicId;
        console.log(id);
        const reward = yield (0, campaignUsecases_1.campaignUsecase)(dbRepositoryCampaign).getReward(id);
        res.status(200).json({ reward });
    }));
    const listCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const list = yield (0, campaignUsecases_1.campaignUsecase)(dbRepositoryCampaign).listCategory();
        res.status(200).json({ message: 'fetched', list });
    }));
    const getDashboardData = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { creatorEmail } = req.params;
        const data = yield (0, campaignUsecases_1.campaignUsecase)(dbRepositoryCampaign).getDashboardData(creatorEmail);
        res.status(200).json({ message: 'data retrieved successfully', data });
    }));
    const getPaymentData = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { campaignId } = req.params;
        console.log(campaignId);
        const paymentData = yield (0, campaignUsecases_1.campaignUsecase)(dbRepositoryCampaign).getPaymentData(campaignId);
        res.status(200).json({ message: 'fetched successfully', paymentData });
    }));
    const getSearchResult = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { query } = req.params;
        const result = yield (0, campaignUsecases_1.campaignUsecase)(dbRepositoryCampaign).search(query);
        res.status(200).json({ result });
    }));
    const HandleLIve = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { campaignId } = req.body;
        const result = yield (0, campaignUsecases_1.campaignUsecase)(dbRepositoryCampaign).HandleLIve(campaignId);
        res.status(200).json({ message: 'succesfuly updated', result });
    }));
    return {
        listCampaigns,
        createBasics,
        createAdvanced,
        createReward,
        getCampaign,
        getCategory,
        addComment,
        listComments,
        getReward,
        listCategory,
        getDashboardData,
        getPaymentData,
        getSearchResult,
        HandleLIve
    };
};
exports.campaignController = campaignController;
