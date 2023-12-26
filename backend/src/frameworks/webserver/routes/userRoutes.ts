import express from "express";
import { userController } from "../../../controllers/userController";
import { userDbInterface } from "../../../application/repository/userDbrepository";
import { userDbMethods } from "../../database/mongoDb/implementations/userDbMethods";
import { protect } from "../middlewares/userAuth";

const router = express.Router();
const controller = userController(userDbInterface, userDbMethods);
const auth=protect(userDbInterface,userDbMethods)

router.post("/register", controller.addUser);
router.post("/login",controller.userSignIn);
router.post('/logout',controller.userSignout)
router.get('/profile',auth,controller.getProfile)
router.patch('/profile',auth,controller.editProfile)  

export default router;

