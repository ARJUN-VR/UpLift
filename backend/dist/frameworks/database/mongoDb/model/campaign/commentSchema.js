"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    campaignid: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
});
exports.Comment = (0, mongoose_1.model)('Comments', commentSchema);
