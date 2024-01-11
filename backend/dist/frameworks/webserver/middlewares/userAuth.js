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
        const token = req.cookies.jwt;
        if (token) {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, config_1.configKeys.JWT_KEY);
                const userdata = yield dbRepository.findById(decoded.userId);
                if (userdata === null || userdata === void 0 ? void 0 : userdata.isBlocked) {
                    const error = new Error('Access denied.');
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
            throw new Error('Not authorized,no Token');
        }
    }));
};
exports.protect = protect;
