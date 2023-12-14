import express from "express";
import { userController } from "../../../controllers/userController";
import { userDbInterface } from "../../../application/repository/userDbrepository";
import { userDbMethods } from "../../database/mongoDb/implementations/userDbMethods";

const router = express.Router();
const controller = userController(userDbInterface, userDbMethods);

router.post("/register", controller.addUser);
router.post("/", controller.userSignIn);

export default router;
