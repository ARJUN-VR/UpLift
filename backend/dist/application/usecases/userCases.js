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
exports.userCases = void 0;
const userCases = (repository) => {
    const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.adduser(user); });
    const userSignIn = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield repository.findByEmail(email);
        if (!user) {
            return { success: false, error: 'no user found' };
        }
        if (user && typeof user.matchPassword === 'function') {
            if (yield user.matchPassword(password)) {
                return { success: true, user };
            }
            else {
                return { success: false, error: 'Incorrect password' };
            }
        }
        else {
            return { success: false, error: 'Unable to verify password' };
        }
    });
    return {
        addUser,
        userSignIn
    };
};
exports.userCases = userCases;
