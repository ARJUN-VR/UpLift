import express from "express";
import { userController } from "../../../controllers/userController";
import { userDbInterface } from "../../../application/repository/userDbrepository";
import { userDbMethods } from "../../database/mongoDb/implementations/userDbMethods";
import { protect } from "../middlewares/userAuth";
import { campaignController } from "../../../controllers/campaignController";
import { campaignDbInterface } from "../../../application/repository/campaignDbRepository";
import { campaignDbMethods } from "../../database/mongoDb/implementations/campaignDbMethods";

const router = express.Router();
const controller = userController(userDbInterface, userDbMethods);
const campaigncontroller = campaignController(campaignDbInterface,campaignDbMethods)
const auth=protect(userDbInterface,userDbMethods);

//user routes
router.post("/register", controller.addUser);
router.post("/login",controller.userSignIn);
router.post('/logout',controller.userSignout)
router.get('/profile',auth,controller.getProfile)
router.patch('/profile',auth,controller.editProfile)  
router.patch('/forgot-password',controller.forgotPassword)
router.post('/send-otp',controller.SendOTP)
router.post('/verify-otp',controller.verifyOtp)


// campaign routes
router.get('/get-campaigns',campaigncontroller.listCampaigns)
router.post('/create_basics',auth,campaigncontroller.createBasics)
router.post('/create_advanced',auth,campaigncontroller.createAdvanced)
router.post('/create-reward',campaigncontroller.createReward)
router.get('/campaign/:basicId',campaigncontroller.getCampaign)
router.get('/get-category/:category',campaigncontroller.getCategory)
router.post('/comment',campaigncontroller.addComment)
router.get('/comment/:campaignId',campaigncontroller.listComments)

export default router;

