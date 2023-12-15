import express from "express";
import { userController } from "../../../controllers/userController";
import { userDbInterface } from "../../../application/repository/userDbrepository";
import { userDbMethods } from "../../database/mongoDb/implementations/userDbMethods";
import { protect } from "../middlewares/userAuth";

const router = express.Router();
const controller = userController(userDbInterface, userDbMethods);

router.post("/register", controller.addUser);
router.post("/",protect(userDbInterface,userDbMethods),controller.userSignIn);
router.post('/logout',controller.userSignout)

export default router;
