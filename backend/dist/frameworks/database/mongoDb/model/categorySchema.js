"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    isBlocked: {
        type: Boolean,
        required: true,
        default: false
    }
});
exports.Category = (0, mongoose_1.model)('category', categorySchema);
