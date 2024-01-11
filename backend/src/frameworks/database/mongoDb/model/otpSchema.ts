import mongoose, { Schema } from "mongoose";


const otpSchema = new Schema({
    userEmail:{
        type:String,ref:'User'
    },
    otp:Number,
    createdAt:{
        type:Date,expires:'1m',default:Date.now
    }
})

export const OTP = mongoose.model('OTP',otpSchema)