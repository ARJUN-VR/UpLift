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
exports.adminController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const adminCases_1 = require("../application/usecases/adminCases");
const adminController = (dbInterface, dbImplements) => {
    const dbRepsitoryAdmn = dbInterface(dbImplements());
    //desc     admin login
    //route    POST /api/admin/login
    //access   public
    const adminSignin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const result = yield (0, adminCases_1.adminCases)(dbRepsitoryAdmn).adminSignin(email, password, res);
        if (result.success) {
            res.status(200).json({ message: "admin signedIn successfully", result });
        }
        else if (result.error === "Incorrect password") {
            res.status(401).json({ message: "Incorrect password" });
        }
        else if (result.error === "cannot find admin") {
            res.status(404).json({ message: "admin not found" });
        }
        else {
            res.status(404).json({ message: "something went wrong" });
        }
    }));
    //desc   admin Signout
    //route  POST /api/admin/logout
    //access public
    const logout = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        (0, adminCases_1.adminCases)(dbRepsitoryAdmn).logout(res);
        res.status(200).json({ message: "user signed out successfully" });
    }));
    ///desc fetch users
    //route GET /api/admin/getusers
    //access private
    const getUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield (0, adminCases_1.adminCases)(dbRepsitoryAdmn).getUsers();
        res.status(200).json({ message: "users fetched successfully", users });
    }));
    const blockUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const email = req.query.email;
        const user = yield (0, adminCases_1.adminCases)(dbRepsitoryAdmn).blockUser(email);
        res
            .status(200)
            .json({ message: "user blocked/unblocked successfully", user });
    }));
    const findCampaignById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.query.id;
        const basicData = yield (0, adminCases_1.adminCases)(dbRepsitoryAdmn).findCampaignById(id);
        const advancedData = yield (0, adminCases_1.adminCases)(dbRepsitoryAdmn).findAdvanced(id);
        res.status(200).json({ message: "success", basicData, advancedData });
    }));
    const verifyCampaign = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.body.id;
        const data = yield (0, adminCases_1.adminCases)(dbRepsitoryAdmn).verifyCampaign(id);
        res.status(200).json({ message: "verified", data });
    }));
    const listCampaignRequests = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const list = yield (0, adminCases_1.adminCases)(dbRepsitoryAdmn).listCampaignRequests();
        res.status(200).json({ list });
    }));
    const listLiveCampaigns = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const campaigns = yield (0, adminCases_1.adminCases)(dbRepsitoryAdmn).listLiveCampaigns();
        res.status(200).json({ campaigns });
    }));
    const addCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = req.body;
        const result = yield (0, adminCases_1.adminCases)(dbRepsitoryAdmn).addCategory(name);
        res.status(200).json({ message: "category created", result });
    }));
    const categoryAction = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = req.body;
        console.log(name);
        const catData = yield (0, adminCases_1.adminCases)(dbRepsitoryAdmn).handleCategoryAction(name);
        console.log(catData, 'from controller');
        res.status(200).json({ message: "action did", catData });
    }));
    const editCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { newName, categoryId } = req.body;
        const data = yield (0, adminCases_1.adminCases)(dbRepsitoryAdmn).editCategory(categoryId, newName);
        res.status(200).json({ message: 'edit success', data });
    }));
    return {
        adminSignin,
        logout,
        getUsers,
        blockUser,
        findCampaignById,
        verifyCampaign,
        listCampaignRequests,
        listLiveCampaigns,
        addCategory,
        categoryAction,
        editCategory
    };
};
exports.adminController = adminController;
