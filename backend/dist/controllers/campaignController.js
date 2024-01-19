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
    return {
        listCampaigns,
        createBasics,
        createAdvanced,
    };
};
exports.campaignController = campaignController;
