"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reward = void 0;
const mongoose_1 = require("mongoose");
const rewardSchema = new mongoose_1.Schema({
    basicId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        required: false,
        default: 0
    },
    rewardList: {
        type: Array,
        required: true
    },
    claims: {
        type: Number,
        required: false,
        default: 0
    }
});
exports.Reward = (0, mongoose_1.model)('Rewards', rewardSchema);
