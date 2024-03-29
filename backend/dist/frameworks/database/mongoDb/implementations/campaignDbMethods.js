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
exports.campaignDbMethods = void 0;
const advancedSchema_1 = require("../model/campaign/advancedSchema");
const basicSchema_1 = require("../model/campaign/basicSchema");
const commentSchema_1 = require("../model/campaign/commentSchema");
const rewardSchema_1 = require("../model/campaign/rewardSchema");
const mongodb_1 = require("mongodb");
const categorySchema_1 = require("../model/categorySchema");
const paymentSchema_1 = require("../model/paymentSchema");
const campaignDbMethods = () => {
    const getAllBasics = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield basicSchema_1.Basics.find({ $and: [{ isVerified: true }, { isListed: true }] });
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
    const getCampaign = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const campaignid = new mongodb_1.ObjectId(id);
            return yield basicSchema_1.Basics.aggregate([
                {
                    $match: { _id: campaignid },
                },
                {
                    $lookup: {
                        from: "campaign_advanceds",
                        localField: "_id",
                        foreignField: "basicId",
                        as: "advancedData",
                    },
                },
                {
                    $lookup: {
                        from: "rewards",
                        localField: "_id",
                        foreignField: "basicId",
                        as: "rewardData",
                    },
                },
            ]);
        }
        catch (error) {
            console.error("Error in getCampaign:", error);
            throw error;
        }
    });
    const createBasics = (basics) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield basicSchema_1.Basics.create(basics);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
    const createAdvanced = (advanced) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield advancedSchema_1.Advanced.create(advanced);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
    const createReward = (reward) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield rewardSchema_1.Reward.create(reward);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
    const getCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield basicSchema_1.Basics.find({ $and: [{ category: category }, { isVerified: true }, { isListed: true }] });
        }
        catch (error) {
            console.log(error);
        }
    });
    const addComment = (commentData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield commentSchema_1.Comment.create(commentData);
        }
        catch (error) {
            console.log(error);
        }
    });
    const listComments = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield commentSchema_1.Comment.find({ campaignid: id });
        }
        catch (error) {
            console.log(error);
        }
    });
    const getReward = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield rewardSchema_1.Reward.findOne({ basicId: id });
        }
        catch (error) {
            console.error(error);
            throw Error;
        }
    });
    const getNotificationCount = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield basicSchema_1.Basics.find({ isVerified: false }, { new: true }).countDocuments();
        }
        catch (error) {
            console.log(error);
        }
    });
    const listCategory = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield categorySchema_1.Category.find();
        }
        catch (error) {
            console.log(error);
        }
    });
    const getDashboardData = (creatorEmail) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield basicSchema_1.Basics.aggregate([
                { $match: {
                        "creator": creatorEmail
                    } },
                { $project: {
                        'currentAmount': 1,
                        'target': 1,
                        'backers': 1
                    } }
            ]);
        }
        catch (error) {
            console.log(error);
        }
    });
    const getPaymentData = (campaignId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield paymentSchema_1.Payment.find({ campaignId });
    });
    const search = (query) => __awaiter(void 0, void 0, void 0, function* () {
        return yield basicSchema_1.Basics.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { tagline: { $regex: query, $options: 'i' } }
            ]
        });
    });
    const HandleLIve = (campaignId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield basicSchema_1.Basics.findOne({ _id: campaignId });
            if (data) {
                data.isLive = !(data === null || data === void 0 ? void 0 : data.isLive);
                yield data.save();
                return data;
            }
            else {
                return { success: false };
            }
        }
        catch (error) {
            console.error("Error:", error);
            throw error;
        }
    });
    return {
        getAllBasics,
        createBasics,
        createAdvanced,
        createReward,
        getCampaign,
        getCategory,
        addComment,
        listComments,
        getReward,
        getNotificationCount,
        listCategory,
        getDashboardData,
        getPaymentData,
        search,
        HandleLIve
    };
};
exports.campaignDbMethods = campaignDbMethods;
