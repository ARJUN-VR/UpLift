"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const userCases_1 = require("../application/usecases/userCases");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userController = (dbInterface, dbImplements) => {
    const dbRepositoryuser = dbInterface(dbImplements());
    //@desc    user register
    //route    POST /api/user/register
    //access   public
    const addUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.body;
        yield (0, userCases_1.userCases)(dbRepositoryuser).addUser(user);
        res.status(201).json({ message: "user added successfully" });
    }));
    //desc     user login
    //route    POST /api/user
    //access   public
    const userSignIn = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const result = yield (0, userCases_1.userCases)(dbRepositoryuser).userSignIn(email, password, res);
        if (result.success) {
            res.status(200).json({ message: "user signed in successfully" });
        }
        else if (result.error === "Incorrect password") {
            res.status(401).json({ message: "Incorrect password" });
        }
        else if (result.error === "no user found") {
            res.status(404).json({ message: "user not found" });
        }
        else {
            res.status(400).json({ message: "authentication failed" });
        }
    }));
    //desc   user Signout
    //route  POST /api/user/signout
    //access public
    const userSignout = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        (0, userCases_1.userCases)(dbRepositoryuser).userSignout(res);
        res.status(200).json({ message: "user signedOut successfully" });
    }));
    return {
        addUser,
        userSignIn,
        userSignout
    };
};
exports.userController = userController;
