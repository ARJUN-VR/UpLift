"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const userRoutes_1 = require("./userRoutes");
const routes = (app) => {
    console.log('herre');
    app.use('/', userRoutes_1.userRouter);
};
exports.routes = routes;
