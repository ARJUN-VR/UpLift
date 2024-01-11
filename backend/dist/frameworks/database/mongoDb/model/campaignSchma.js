"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Campaign = void 0;
const mongoose_1 = require("mongoose");
const campaignSchema = new mongoose_1.Schema({
    campaignName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    goal: {
        type: Number,
        required: true
    },
    endDate: {
        type: Date,
        requied: true
    },
    userEmail: {
        type: String,
        required: true
    },
    currentAmount: {
        type: Number,
        required: false
    }
});
exports.Campaign = (0, mongoose_1.model)('campaign', campaignSchema);
