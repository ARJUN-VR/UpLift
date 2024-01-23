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
const rewardSchema_1 = require("../model/campaign/rewardSchema");
const mongodb_1 = require("mongodb");
const campaignDbMethods = () => {
    const getAllBasics = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield basicSchema_1.Basics.find();
    });
    const getCampaign = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const campaignid = new mongodb_1.ObjectId(id);
            const data = yield basicSchema_1.Basics.aggregate([
                {
                    $match: { _id: campaignid }
                },
                {
                    $lookup: {
                        from: 'Advanced',
                        localField: '_id',
                        foreignField: 'basicId',
                        as: 'advancedData'
                    }
                },
                {
                    $lookup: {
                        from: 'Reward',
                        localField: '_id',
                        foreignField: 'basicId',
                        as: 'rewardData'
                    }
                }
            ]);
            console.log(data);
            console.log(data[0].advancedData);
            return data;
        }
        catch (error) {
            console.error('Error in getCampaign:', error);
            throw error;
        }
    });
    const createBasics = (basics) => __awaiter(void 0, void 0, void 0, function* () {
        return yield basicSchema_1.Basics.create(basics);
    });
    const createAdvanced = (advanced) => __awaiter(void 0, void 0, void 0, function* () {
        const objId = new mongodb_1.ObjectId(advanced.basicId);
        advanced.basicId = objId;
        return yield advancedSchema_1.Advanced.create(advanced);
    });
    const createReward = (reward) => __awaiter(void 0, void 0, void 0, function* () {
        const objId = new mongodb_1.ObjectId(reward.basicId);
        reward.basicId = objId;
        return yield rewardSchema_1.Reward.create(reward);
    });
    return {
        getAllBasics,
        createBasics,
        createAdvanced,
        createReward,
        getCampaign
    };
};
exports.campaignDbMethods = campaignDbMethods;
