"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../../../controllers/adminController");
const adminDbrepository_1 = require("../../../application/repository/adminDbrepository");
const adminDbMethods_1 = require("../../database/mongoDb/implementations/adminDbMethods");
const adminRouter = express_1.default.Router();
const controller = (0, adminController_1.adminController)(adminDbrepository_1.adminDbInterface, adminDbMethods_1.adminDbMethods);
adminRouter.post('/login', controller.adminSignin);
adminRouter.post('/logout', controller.logout);
adminRouter.get('/getusers', controller.getUsers);
adminRouter.patch('/blockuser', controller.blockUser);
adminRouter.get('/getCampaign', controller.findCampaignById);
adminRouter.patch('/verify-campaign', controller.verifyCampaign);
adminRouter.get('/get-campaigns', controller.listCampaignRequests);
adminRouter.get('/get-liveCampaigns', controller.listLiveCampaigns);
adminRouter.post('/category', controller.addCategory);
adminRouter.patch('/category-action', controller.categoryAction);
adminRouter.patch('/edit-category', controller.editCategory);
adminRouter.get('/dashboard', controller.getDashboardCounts);
adminRouter.get('/dashboard-payments', controller.getPaymentBarData);
adminRouter.get('/dashboard-pie', controller.getPieChartData);
adminRouter.get('/dashboard-line', controller.getLineChartData);
exports.default = adminRouter;
