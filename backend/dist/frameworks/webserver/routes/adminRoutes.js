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
exports.default = adminRouter;
