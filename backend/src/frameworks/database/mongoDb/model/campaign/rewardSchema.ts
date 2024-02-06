import mongoose, { Schema, model } from 'mongoose';

const rewardSchema = new Schema({
      basicId:{
        type:Schema.Types.ObjectId,
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
      pledgeAmount:{
        type:Number,
        required:false,
        default:250
      },
      rewardList:{
        type:Array,
        required:true
      },
      claims:{
        type:Number,
        required:false,
        default:0
      }
      
})

export const Reward = model('Rewards',rewardSchema)