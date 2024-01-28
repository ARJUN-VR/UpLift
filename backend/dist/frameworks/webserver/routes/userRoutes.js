"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../../../controllers/userController");
const userDbrepository_1 = require("../../../application/repository/userDbrepository");
const userDbMethods_1 = require("../../database/mongoDb/implementations/userDbMethods");
const userAuth_1 = require("../middlewares/userAuth");
const campaignController_1 = require("../../../controllers/campaignController");
const campaignDbRepository_1 = require("../../../application/repository/campaignDbRepository");
const campaignDbMethods_1 = require("../../database/mongoDb/implementations/campaignDbMethods");
const router = express_1.default.Router();
const controller = (0, userController_1.userController)(userDbrepository_1.userDbInterface, userDbMethods_1.userDbMethods);
const campaigncontroller = (0, campaignController_1.campaignController)(campaignDbRepository_1.campaignDbInterface, campaignDbMethods_1.campaignDbMethods);
const auth = (0, userAuth_1.protect)(userDbrepository_1.userDbInterface, userDbMethods_1.userDbMethods);
//user routes
router.post("/register", controller.addUser);
router.post("/login", controller.userSignIn);
router.post('/logout', controller.userSignout);
router.get('/profile', auth, controller.getProfile);
router.patch('/profile', auth, controller.editProfile);
router.patch('/forgot-password', controller.forgotPassword);
router.post('/send-otp', controller.SendOTP);
router.post('/verify-otp', controller.verifyOtp);
// campaign routes
router.get('/get-campaigns', campaigncontroller.listCampaigns);
router.post('/create_basics', auth, campaigncontroller.createBasics);
router.post('/create_advanced', auth, campaigncontroller.createAdvanced);
router.post('/create-reward', campaigncontroller.createReward);
router.get('/campaign/:basicId', campaigncontroller.getCampaign);
router.get('/get-category/:category', campaigncontroller.getCategory);
router.post('/comment', campaigncontroller.addComment);
router.get('/comment/:campaignId', campaigncontroller.listComments);
exports.default = router;
