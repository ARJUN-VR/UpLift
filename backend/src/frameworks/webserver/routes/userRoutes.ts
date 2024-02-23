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
router.post('/payment',controller.payment)
router.post('/pledge',auth,controller.pledge)
router.get('/channels/:userEmail',controller.getChannel)
router.post('/chat',controller.saveChat)
router.get('/chat/:campaignId',controller.getChats)


// campaign routes
router.get('/get-campaigns',campaigncontroller.listCampaigns)
router.post('/create_basics',campaigncontroller.createBasics)
router.post('/create_advanced',campaigncontroller.createAdvanced)
router.post('/create-reward',campaigncontroller.createReward)
router.get('/campaign/:basicId',campaigncontroller.getCampaign)
router.get('/get-category/:category',campaigncontroller.getCategory)
router.post('/comment',campaigncontroller.addComment)
router.get('/comment/:campaignId',campaigncontroller.listComments)
router.get('/reward/:basicId',campaigncontroller.getReward)
router.get('/fetchthedata',campaigncontroller.listCategory)
router.get('/dashboard/:creatorEmail',campaigncontroller.getDashboardData)
router.get('/paymentData/:campaignId',campaigncontroller.getPaymentData)
router.get('/search',campaigncontroller.getSearchData)

export default router;

 