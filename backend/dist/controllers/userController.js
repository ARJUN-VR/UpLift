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
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default('sk_test_51OgAh7SBqBEeU2LVufG4q6TNE6MLKyoN2lcbm3Re8JjjF2sDSRzHMCSXLsBt2K6M1GJxthhi3qk8mLjVo01VmM3y00Nh0SkIcv', {});
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
        else if (result.error === "user blocked") {
            res.status(403).json({ message: "Access denied." });
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
        console.log(email, 'email');
        const userdata = yield (0, userCases_1.userCases)(dbRepositoryuser).findByEmail(email);
        console.log(userdata, 'userdata');
        res
            .status(200)
            .json({ message: "fetched user profile successully", userdata });
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
    //desc Handling otp service
    //route POST /api/user/sendotp
    //access private
    const SendOTP = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email } = req.body;
        const otpResponse = yield (0, userCases_1.userCases)(dbRepositoryuser).verifyUserAndSendOtp(email);
        res.status(200).json(otpResponse);
    }));
    //desc otp verification
    //route POST /api/user/verify-otp
    //access public
    const verifyOtp = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, newOtp } = req.body;
        const otpRes = yield (0, userCases_1.userCases)(dbRepositoryuser).verifyOtp(email, newOtp);
        console.log(otpRes);
        res.status(200).json({ message: otpRes === null || otpRes === void 0 ? void 0 : otpRes.message });
    }));
    const payment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, description, amount } = req.body;
        try {
            const session = yield stripe.checkout.sessions.create({
                line_items: [
                    {
                        price_data: {
                            currency: "inr",
                            product_data: {
                                name: title,
                                description: description,
                            },
                            unit_amount: amount * 100,
                        },
                        quantity: 1,
                    },
                ],
                payment_method_types: ["card"],
                customer_email: 'user@gmail.com',
                billing_address_collection: "required",
                mode: "payment",
                success_url: 'http://localhost:5500/success',
                cancel_url: 'http://localhost:5500/campaign/:65b6ac268d3ba59ed8357deb',
            });
            res.send({ url: session.url });
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }));
    const pledge = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, amount, userEmail } = req.body;
        const data = yield (0, userCases_1.userCases)(dbRepositoryuser).pledge(id, amount, userEmail);
        res.status(200).json({ data });
    }));
    const getChannel = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userEmail } = req.params;
        console.log(userEmail);
        const data = yield (0, userCases_1.userCases)(dbRepositoryuser).getChannels(userEmail);
        res.status(200).json({ data });
    }));
    const saveChat = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const chat = req.body;
        const data = yield (0, userCases_1.userCases)(dbRepositoryuser).saveChat(chat);
        res.status(200).json({ data });
    }));
    const getChats = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { campaignId } = req.params;
        console.log(campaignId);
        const data = yield (0, userCases_1.userCases)(dbRepositoryuser).getChats(campaignId);
        res.status(200).json({ data });
    }));
    return {
        addUser,
        userSignIn,
        userSignout,
        getProfile,
        editProfile,
        forgotPassword,
        SendOTP,
        verifyOtp,
        payment,
        pledge,
        getChannel,
        saveChat,
        getChats
    };
};
exports.userController = userController;
