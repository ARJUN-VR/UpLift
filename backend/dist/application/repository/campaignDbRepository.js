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
exports.campaignDbInterface = void 0;
const campaignDbInterface = (repository) => {
    const listCampaigns = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getAllBasics();
    });
    const getCampaign = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getCampaign(id);
    });
    const createBasics = (basics) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.createBasics(basics);
    });
    const createAdvanced = (advanced) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.createAdvanced(advanced);
    });
    const createReward = (reward) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.createReward(reward);
    });
    return {
        listCampaigns,
        createBasics,
        createAdvanced,
        createReward,
        getCampaign
    };
};
exports.campaignDbInterface = campaignDbInterface;
