"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    campaignId: String,
    userName: String,
    message: String,
    image: String,
    video: String
});
exports.Chat = (0, mongoose_1.model)('chats', chatSchema);
