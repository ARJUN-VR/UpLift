import { Schema, model } from "mongoose";

const paymentSchema = new Schema({
    campaignId:String,
    userEmail:String,
    payment:Number
})

export const Payment = model('Payment',paymentSchema)