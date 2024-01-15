import express from "express";
import { userController } from "../../../controllers/userController";
import { userDbInterface } from "../../../application/repository/userDbrepository";
import { userDbMethods } from "../../database/mongoDb/implementations/userDbMethods";
import { protect } from "../middlewares/userAuth";

const router = express.Router();
const controller = userController(userDbInterface, userDbMethods);
const auth=protect(userDbInterface,userDbMethods);

router.post("/register", controller.addUser);
router.post("/login",controller.userSignIn);
router.post('/logout',controller.userSignout)
router.get('/profile',auth,controller.getProfile)
router.patch('/profile',auth,controller.editProfile)  
router.patch('/forgot-password',controller.forgotPassword)
router.post('/send-otp',controller.SendOTP)
router.post('/verify-otp',controller.verifyOtp)
router.post('/create-campaign',auth,controller.createCampaign)
router.get('/get-campaigns',controller.listCampaigns)
router.post('/create_basics',auth,controller.createBasics)
router.post('/create_advanced',auth,controller.createAdvanced)

export default router;

