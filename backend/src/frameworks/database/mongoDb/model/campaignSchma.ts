import mongoose, { Schema, model } from "mongoose";

const campaignSchema = new Schema({
    campaignName:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    story:{ 
        type:String,
        required:true
    },
    image:{
         type:String,
         required:true 
    },
    goal:{
        type:Number,
        required:true
    },
    endDate:{
        type:Date,
        requied:true
    },
    userEmail:{
        type:String,
        required:true
    },
    currentAmount:{
        type:Number,
        required:false
    }
})

export const Campaign = model('campaign',campaignSchema)