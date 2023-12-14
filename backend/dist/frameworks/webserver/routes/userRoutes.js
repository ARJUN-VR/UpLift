"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../../../controllers/userController");
const userDbrepository_1 = require("../../../application/repository/userDbrepository");
const userDbMethods_1 = require("../../database/mongoDb/implementations/userDbMethods");
const router = express_1.default.Router();
const controller = (0, userController_1.userController)(userDbrepository_1.userDbInterface, userDbMethods_1.userDbMethods);
router.post('/register', controller.addUser);
router.post('/', controller.userSignIn);
exports.default = router;
