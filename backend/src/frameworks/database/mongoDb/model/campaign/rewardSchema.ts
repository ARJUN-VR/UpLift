import mongoose, { Schema, model } from 'mongoose';

const rewardSchema = new Schema({
      basicId:{
        type:String,
        required : true
      },
      title:{
        type:String,
        required:true
      },
      image:{
        type:String,
        required:false
      },
      pledge:{
        type:Number,
        required:false
      },
      description:{
        type:String,
        required:true
      },
      claims:{
        type:Number,
        required:false
      }
      
})

export const Reward = model('Rewards',rewardSchema)