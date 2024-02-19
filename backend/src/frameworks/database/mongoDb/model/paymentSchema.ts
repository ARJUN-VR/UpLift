import { Schema, model } from "mongoose";

const paymentSchema = new Schema({
    campaignId:String,
    userEmail:String,
    payment:Number
},{timestamps:true})

export const Payment = model('Payment',paymentSchema)