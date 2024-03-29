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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../frameworks/database/mongoDb/config");
const generateAdminToken = (res, admin) => __awaiter(void 0, void 0, void 0, function* () {
    const Id = admin._id;
    const Token = jsonwebtoken_1.default.sign({ Id }, config_1.configKeys.ACCESS_KEY, {
        expiresIn: '10d'
    });
    res.cookie('adminJwt', Token, {
        httponly: true,
        secure: config_1.configKeys.NODE_ENV !== 'development',
        samesite: true,
        maxAge: 30 * 24 * 60 * 60 * 1000
    });
});
exports.default = generateAdminToken;
