import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    campaignid:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
})

export const Comment = model('Comments',commentSchema)

