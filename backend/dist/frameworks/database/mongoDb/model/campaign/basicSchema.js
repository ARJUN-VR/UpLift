"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Basics = void 0;
const mongoose_1 = require("mongoose");
const basicSchama = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    tagline: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    target: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    backers: {
        type: Number,
        required: false,
        default: 0
    },
    currentAmount: {
        type: Number,
        required: false,
        default: 0
    },
    isVerified: {
        type: Boolean,
        required: false,
        default: false
    },
    creator: {
        type: String,
        requried: false
    },
    isListed: {
        type: Boolean,
        requried: false,
        default: false
    }
}, { timestamps: true });
exports.Basics = (0, mongoose_1.model)('campaign_basics', basicSchama);
