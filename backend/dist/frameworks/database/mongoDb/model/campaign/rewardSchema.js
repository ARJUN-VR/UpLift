"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reward = void 0;
const mongoose_1 = require("mongoose");
const rewardSchema = new mongoose_1.Schema({
    basicId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    pledgeAmount: {
        type: Number,
        required: false
    },
    desc: {
        type: String,
        required: true
    },
    claims: {
        type: Number,
        required: false
    }
});
exports.Reward = (0, mongoose_1.model)('Rewards', rewardSchema);
