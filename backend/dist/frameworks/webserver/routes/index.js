"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const userRoutes_1 = __importDefault(require("./userRoutes"));
const adminRoutes_1 = __importDefault(require("./adminRoutes"));
const routes = (app) => {
    app.use('/api/user', userRoutes_1.default);
    app.use('/api/admin', adminRoutes_1.default);
};
exports.routes = routes;
