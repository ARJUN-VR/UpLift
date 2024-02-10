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
exports.adminDbMethods = void 0;
const adminSchema_1 = require("../model/adminSchema");
const advancedSchema_1 = require("../model/campaign/advancedSchema");
const basicSchema_1 = require("../model/campaign/basicSchema");
const categorySchema_1 = require("../model/categorySchema");
const userSchema_1 = require("../model/userSchema");
const adminDbMethods = () => {
    const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        return yield adminSchema_1.Admin.findOne({ email: email });
    });
    const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield userSchema_1.User.find().select('-password');
    });
    const blockUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userSchema_1.User.findOne({ email: email });
        if (!user) {
            return { success: false };
        }
        else {
            user.isBlocked = !user.isBlocked;
            return yield user.save();
        }
    });
    const findCampaignById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield basicSchema_1.Basics.find({ _id: id });
    });
    const findAdvanced = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield advancedSchema_1.Advanced.find({ basicId: id });
    });
    const verfyCampaign = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield basicSchema_1.Basics.updateOne({ _id: id }, { $set: { isVerified: true } });
    });
    const listCampaignRequests = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield basicSchema_1.Basics.find({ isVerified: false });
    });
    const listLiveCampaigns = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield basicSchema_1.Basics.find({ isVerified: true });
    });
    const addCategory = (name) => __awaiter(void 0, void 0, void 0, function* () {
        return yield categorySchema_1.Category.create({ name });
    });
    const listCategory = (name) => __awaiter(void 0, void 0, void 0, function* () {
        return yield basicSchema_1.Basics.updateMany({ category: name }, { $set: { isListed: true } });
    });
    const unListCategory = (name) => __awaiter(void 0, void 0, void 0, function* () {
        return yield basicSchema_1.Basics.updateMany({ category: name }, { $set: { isListed: false } });
    });
    const checkListStatus = (name) => __awaiter(void 0, void 0, void 0, function* () {
        const campData = yield basicSchema_1.Basics.find({ category: name });
        return campData[0].isListed;
    });
    return {
        findByEmail,
        getUsers,
        blockUser,
        findCampaignById,
        verfyCampaign,
        listCampaignRequests,
        listLiveCampaigns,
        findAdvanced,
        addCategory,
        listCategory,
        unListCategory,
        checkListStatus
    };
};
exports.adminDbMethods = adminDbMethods;
