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
const paymentSchema_1 = require("../model/paymentSchema");
const userSchema_1 = require("../model/userSchema");
const adminDbMethods = () => {
    const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield adminSchema_1.Admin.findOne({ email: email });
        }
        catch (error) {
            console.error("Error finding admin by email:", error);
            throw new Error("Error finding admin by email");
        }
    });
    const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield userSchema_1.User.find().select('-password');
        }
        catch (error) {
            console.error("Error getting users:", error);
            throw new Error("Error getting users");
        }
    });
    const blockUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userSchema_1.User.findOne({ email: email });
            if (!user) {
                return { success: false };
            }
            else {
                user.isBlocked = !user.isBlocked;
                return yield user.save();
            }
        }
        catch (error) {
            console.error("Error blocking user:", error);
            throw new Error("Error blocking user");
        }
    });
    const findCampaignById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield basicSchema_1.Basics.find({ _id: id });
        }
        catch (error) {
            console.error("Error finding campaign by ID:", error);
            throw new Error("Error finding campaign by ID");
        }
    });
    const findAdvanced = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield advancedSchema_1.Advanced.find({ basicId: id });
        }
        catch (error) {
            console.error("Error finding advanced by ID:", error);
            throw new Error("Error finding advanced by ID");
        }
    });
    const verfyCampaign = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield basicSchema_1.Basics.updateOne({ _id: id }, { $set: { isVerified: true } });
        }
        catch (error) {
            console.error("Error verifying campaign:", error);
            throw new Error("Error verifying campaign");
        }
    });
    const listCampaignRequests = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield basicSchema_1.Basics.find({ isVerified: false });
        }
        catch (error) {
            console.error("Error listing campaign requests:", error);
            throw new Error("Error listing campaign requests");
        }
    });
    const listLiveCampaigns = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield basicSchema_1.Basics.find({ isVerified: true });
        }
        catch (error) {
            console.error("Error listing live campaigns:", error);
            throw new Error("Error listing live campaigns");
        }
    });
    const addCategory = (name) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const isExist = yield categorySchema_1.Category.find({ name });
            if (isExist && isExist.length > 0) {
                throw new Error('category already exist');
            }
            else {
                return yield categorySchema_1.Category.create({ name });
            }
        }
        catch (error) {
            console.error("Error adding category:", error);
            throw new Error("Error adding category");
        }
    });
    const listCategory = (name) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield basicSchema_1.Basics.updateMany({ category: name }, { $set: { isListed: true } }, { new: true });
            const detail = yield categorySchema_1.Category.findOne({ name: name });
            if (detail) {
                detail.isBlocked = !detail.isBlocked;
                yield detail.save();
            }
            else {
                return { success: false };
            }
            return basicSchema_1.Basics.find({ category: name });
        }
        catch (error) {
            console.error("Error listing category:", error);
            throw new Error("Error listing category");
        }
    });
    const unListCategory = (name) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield basicSchema_1.Basics.updateMany({ category: name }, { $set: { isListed: false } }, { new: true });
            const detail = yield categorySchema_1.Category.findOne({ name: name });
            if (detail) {
                detail.isBlocked = !detail.isBlocked;
                yield detail.save();
            }
            else {
                return { success: false };
            }
            return basicSchema_1.Basics.find({ category: name });
        }
        catch (error) {
            console.error("Error unlisting category:", error);
            throw new Error("Error unlisting category");
        }
    });
    const checkListStatus = (name) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const campData = yield basicSchema_1.Basics.find({ category: name });
            return campData[0].isListed;
        }
        catch (error) {
            console.log(error);
        }
    });
    const editCategory = (categoryId, newName) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield categorySchema_1.Category.findOneAndUpdate({ _id: categoryId }, { $set: { name: newName } }, { new: true });
        }
        catch (error) {
            console.log(error);
            const msg = error.codeName;
            throw new Error(msg);
        }
    });
    const dashboardCounts = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const aggregatedData = yield basicSchema_1.Basics.aggregate([
                {
                    $match: {
                        isVerified: true,
                        isListed: true
                    }
                },
                {
                    $group: {
                        _id: null,
                        liveCampaignCount: { $sum: 1 },
                        totalBackers: { $sum: "$backers" },
                        totalAmount: { $sum: "$currentAmount" }
                    }
                }
            ]);
            return {
                campaignCount: ((_a = aggregatedData[0]) === null || _a === void 0 ? void 0 : _a.liveCampaignCount) || 0,
                backers: ((_b = aggregatedData[0]) === null || _b === void 0 ? void 0 : _b.totalBackers) || 0,
                Amount: ((_c = aggregatedData[0]) === null || _c === void 0 ? void 0 : _c.totalAmount) || 0
            };
        }
        catch (error) {
            console.log(error);
        }
    });
    const paymentBarData = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield paymentSchema_1.Payment.aggregate([
            {
                $project: {
                    _id: 0,
                    payment: 1,
                    isCreatedAt: 1
                }
            }
        ]);
    });
    const pieChartData = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield basicSchema_1.Basics.aggregate([
                {
                    $group: {
                        _id: "$category",
                        count: { $sum: 1 }
                    }
                }
            ]);
            const result = data.map(item => ["Category: " + item._id, item.count]);
            result.unshift(["Category", "Count"]);
            return result;
        }
        catch (error) {
            console.log(error);
            return [];
        }
    });
    const lineChart = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const monthlyUserRegistrations = yield userSchema_1.User.aggregate([
                {
                    $project: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" }
                    }
                },
                {
                    $group: {
                        _id: { month: "$month", year: "$year" },
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { "_id.year": 1, "_id.month": 1 } // Optionally, sort by year and month
                }
            ]);
            console.log(monthlyUserRegistrations);
            return monthlyUserRegistrations;
        }
        catch (error) {
            console.error("Error fetching monthly user registrations:", error);
            throw error;
        }
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
        checkListStatus,
        editCategory,
        dashboardCounts,
        paymentBarData,
        pieChartData,
        lineChart
    };
};
exports.adminDbMethods = adminDbMethods;
