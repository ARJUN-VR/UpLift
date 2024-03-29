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
exports.adminDbInterface = void 0;
const adminDbInterface = (repository) => {
    const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.findByEmail(email);
    });
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
        return yield repository.verfyCampaign(id);
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
    const addCategory = (name) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.addCategory(name);
    });
    const listCategory = (name) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.listCategory(name);
    });
    const unListCategory = (name) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.unListCategory(name);
    });
    const checkListStatus = (name) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.checkListStatus(name);
    });
    const editCategory = (categoryId, newName) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.editCategory(categoryId, newName);
    });
    const dashboardCounts = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.dashboardCounts();
    });
    const paymentBarData = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.paymentBarData();
    });
    const pieChartData = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.pieChartData();
    });
    const lineChartData = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.lineChart();
    });
    return {
        findByEmail,
        getUsers,
        blockUser,
        findCampaignById,
        verifyCampaign,
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
        lineChartData
    };
};
exports.adminDbInterface = adminDbInterface;
