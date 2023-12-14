"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configKeys = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.configKeys = {
    MONGODB_URI: process.env.URI,
    PORT: process.env.PORT,
    SALT_ROUNDS: process.env.SALT_ROUNDS
};
