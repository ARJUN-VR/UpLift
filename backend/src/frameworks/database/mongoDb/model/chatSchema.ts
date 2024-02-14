import { Schema, model } from "mongoose";

const chatSchema = new Schema({
    campaignId:String,
    userName:String,
    message:String
})

export const Chat = model('chats',chatSchema)