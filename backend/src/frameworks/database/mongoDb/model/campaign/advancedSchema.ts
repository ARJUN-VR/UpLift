import mongoose, { Schema, model } from "mongoose";

const advancedSchema = new Schema({
    video:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    story:{
        type:String,
        required:true
    }
})

export const Advanced = model('campaign_advanced',advancedSchema)