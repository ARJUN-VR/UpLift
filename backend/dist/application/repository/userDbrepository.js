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
exports.userDbInterface = void 0;
const userDbInterface = (repository) => {
    const adduser = (user) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addUser(user); });
    const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield repository.findByEmail(email);
        return user;
    });
    const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.findById(id);
    });
    const saveUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.saveUser(req);
    });
    return {
        adduser,
        findByEmail,
        findById,
        saveUser
    };
};
exports.userDbInterface = userDbInterface;
