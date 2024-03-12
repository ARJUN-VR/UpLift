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
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const config_1 = require("../../database/mongoDb/config");
const protect = (userDbInterface, dbImplements) => {
    const dbRepository = userDbInterface(dbImplements());
    return (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const accessToken = req.cookies.accessToken;
        console.log("accesToken:", accessToken);
        const renewToken = () => __awaiter(void 0, void 0, void 0, function* () {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                console.log("works");
                return res.json({ message: "no refresh token" });
            }
            else {
                try {
                    const decoded = jsonwebtoken_1.default.verify(refreshToken, config_1.configKeys.REFRESH_KEY);
                    const userId = decoded.userId;
                    console.log(userId, "userId");
                    const accessToken = jsonwebtoken_1.default.sign({ userId }, config_1.configKeys.ACCESS_KEY, {
                        expiresIn: "1m",
                    });
                    res.cookie("accessToken", accessToken, { maxAge: 600000 });
                    next();
                }
                catch (error) {
                    console.log(error);
                }
            }
        });
        if (accessToken) {
            try {
                const decoded = jsonwebtoken_1.default.verify(accessToken, config_1.configKeys.ACCESS_KEY);
                const userdata = yield dbRepository.findById(decoded.userId);
                if (userdata === null || userdata === void 0 ? void 0 : userdata.isBlocked) {
                    const error = new Error("Access denied.");
                    throw error;
                }
                else {
                    req.user = userdata;
                    next();
                }
            }
            catch (error) {
                next(error);
            }
        }
        else {
            console.log("here");
            yield renewToken();
        }
    }));
};
exports.protect = protect;
