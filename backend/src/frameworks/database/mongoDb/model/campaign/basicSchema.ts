import mongoose, { Schema, model } from "mongoose";

const basicSchama = new Schema({
    title:{
        type:String,
        required:true
    },
    tagline:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    target:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    backers:{
        type:Number,
        required:false,
        default:0
    },
    currentAmount:{
        type:Number,
        required:false,
        default:0
    },
    isVerified:{
        type:Boolean,
        required:false,
        default:false
    },
    isListed:{
        type:Boolean,
        requried:false,
        default:false
    }
})

export const Basics =  model('campaign_basics',basicSchama)