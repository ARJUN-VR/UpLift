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
        const userData = yield (0, userCases_1.userCases)(dbRepositoryuser).addUser(user);
        if (userData == false) {
            res.status(401).json({ message: "user already exist" });
        }
        else {
            res.status(201).json({ message: "user added successfully", userData });
        }
    }));
    //desc     user login
    //route    POST /api/user
    //access   public
    const userSignIn = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, pass } = req.body;
        const result = yield (0, userCases_1.userCases)(dbRepositoryuser).userSignIn(email, pass, res);
        if (result.success) {
            res.status(200).json({ message: "user signed in successfully", result });
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
    //desc getUserProfile
    //route GET /api/user/profile
    //access private
    const getProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const email = req.user.email;
        const userdata = yield (0, userCases_1.userCases)(dbRepositoryuser).findByEmail(email);
        res.status(200).json({ message: "fetched user profile successully", userdata });
    }));
    //desc edit UserProfile
    //route PATCH /api/user/profile
    //access private
    const editProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const updateduser = yield (0, userCases_1.userCases)(dbRepositoryuser).updateProfile(req);
        res.status(200).json({ message: "profile updated successfully" });
    }));
    //desc forgot password
    //route PATCH /api/user/forgotpassword
    //access public
    const forgotPassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        yield (0, userCases_1.userCases)(dbRepositoryuser).forgotPassword(email, password);
        res.status(200).json({ message: "password changed successfully" });
    }));
    return {
        addUser,
        userSignIn,
        userSignout,
        getProfile,
        editProfile,
        forgotPassword,
    };
};
exports.userController = userController;
