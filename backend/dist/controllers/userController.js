"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const userController = () => {
    const loadPage = (req, res) => {
        res.send("<h1>hey its working....have a great start</h1>");
    };
    return {
        loadPage
    };
};
exports.userController = userController;
