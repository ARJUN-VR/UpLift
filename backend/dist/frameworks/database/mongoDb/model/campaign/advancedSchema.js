"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Advanced = void 0;
const mongoose_1 = require("mongoose");
const advancedSchema = new mongoose_1.Schema({
    video: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: true
    }
});
exports.Advanced = (0, mongoose_1.model)('campaign_advanced', advancedSchema);
