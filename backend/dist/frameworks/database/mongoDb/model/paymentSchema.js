"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    campaignId: String,
    userEmail: String,
    payment: Number
});
exports.Payment = (0, mongoose_1.model)('Payment', paymentSchema);
