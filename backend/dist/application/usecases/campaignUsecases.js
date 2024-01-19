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
const campaignUsecase = (repository) => {
    const listCampaigns = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.listCampaigns();
    });
    const createBasics = (basics) => __awaiter(void 0, void 0, void 0, function* () {
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
    return {
        listCampaigns,
        createBasics,
        createAdvanced,
        uploadImage,
        videoUpload,
    };
};
exports.campaignUsecase = campaignUsecase;
