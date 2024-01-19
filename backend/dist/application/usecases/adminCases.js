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
exports.adminCases = void 0;
const adminJwt_1 = __importDefault(require("../services/adminJwt"));
const adminCases = (repository) => {
    const adminSignin = (email, password, res) => __awaiter(void 0, void 0, void 0, function* () {
        const admin = yield repository.findByEmail(email);
        if (!admin) {
            return { success: false, error: 'cannot find admin' };
        }
        if (admin) {
            if (password === admin.password) {
                (0, adminJwt_1.default)(res, admin);
                return { success: true, admin };
            }
            else {
                return { success: false, error: 'Incorrect password' };
            }
        }
        else {
            return { success: false, error: 'something went wrong' };
        }
    });
    const logout = (res) => {
        res.cookie('adminJwt', '', {
            httpOnly: true,
            expires: new Date(0)
        });
    };
    const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getUsers();
    });
    const blockUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.blockUser(email);
    });
    const findCampaignById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.findCampaignById(id);
    });
    const verifyCampaign = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.verifyCampaign(id);
    });
    const listCampaignRequests = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.listCampaignRequests();
    });
    const listLiveCampaigns = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.listLiveCampaigns();
    });
    const findAdvanced = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.findAdvanced(id);
    });
    return {
        adminSignin,
        logout,
        getUsers,
        blockUser,
        findCampaignById,
        verifyCampaign,
        listCampaignRequests,
        listLiveCampaigns,
        findAdvanced
    };
};
exports.adminCases = adminCases;
