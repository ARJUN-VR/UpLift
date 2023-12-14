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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const userCases_1 = require("../application/usecases/userCases");
const userController = (dbInterface, dbImplements) => {
    const dbRepositoryuser = dbInterface(dbImplements());
    const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = req.body;
            yield (0, userCases_1.userCases)(dbRepositoryuser).addUser(user);
            res.status(201).json({ message: 'user added successfully' });
        }
        catch (error) {
            console.log(error);
        }
    });
    const userSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const result = yield (0, userCases_1.userCases)(dbRepositoryuser).userSignIn(email, password);
            if (result.success) {
                res.status(200).json({ message: 'user signed in successfully' });
            }
            else if (result.error === 'Incorrect password') {
                res.status(400).json({ message: "Incorrect password" });
            }
            else {
                res.status(400).json({ message: 'authentication failed' });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500);
        }
    });
    return {
        addUser,
        userSignIn
    };
};
exports.userController = userController;
