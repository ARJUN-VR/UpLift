import mongoose, { Schema, model } from "mongoose";

const advancedSchema = new Schema({
    video:{
        type:String,
        required:true
    },
    basicId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    story:{
        type:String,
        required:true
    },
    pledgeAmount:{
        type:Number,
        required:false
    },
    backers:{
        type:Number,
        required:false
    }
})

export const Advanced = model('campaign_advanced',advancedSchema)