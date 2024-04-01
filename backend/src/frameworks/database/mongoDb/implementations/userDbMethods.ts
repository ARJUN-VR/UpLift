import { userInterface } from "../../../../entities/User";
import { User } from "../model/userSchema";
import { Document } from "mongoose";
import { OTP } from "../model/otpSchema";
import { Basics } from "../model/campaign/basicSchema";
import { Payment } from "../model/paymentSchema";
import { ObjectId } from "mongodb";
import { Chat } from "../model/chatSchema";
import { ChatInterface } from "../../../../entities/Chat";
import { Request,Response } from "express";


export const userDbMethods = () => {
  const addUser = async (user: userInterface) => {
    try {
      return await User.create(user);
    } catch (error) {
      console.error("Error adding user:", error);
      throw new Error("Error adding user");
    }
  };
  
  const findByEmail = async (email: string) => {
    try {
      const user = await User.findOne({ email: email });
      return user;
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw new Error("Error finding user by email");
    }
  };
  
  const findById = async (id: string) => {
    try {
      return await User.findOne({ _id: id });
    } catch (error) {
      console.error("Error finding user by id:", error);
      throw new Error("Error finding user by id");
    }
  };
  



  const saveUser = async (req: Request) => {
    try {
      const user = await User.findById({ _id: req.user._id });
      if (user) {
        user.name = req.body.editName || user.name;
        user.email = req.body.editEmail || user.email;
        user.password = req.body.password || user.password;
        user.image = req.body.image || user.image;
  
        return await user.save();
      }
    } catch (error) {
      console.error("Error saving user:", error);
      throw new Error("Error saving user");
    }
  };
  

  const forgotPassword = async (email: string, password: string) => {
    try {
      const user: userInterface | null = await User.findOne({ email: email });
      if (!user) {
        return { success: false, error: "user not found" };
      } else {
        const userDoc = user as Document & userInterface;
        console.log(password, 'before');
  
        userDoc.password = password;
        console.log(userDoc.password, 'after');
        await userDoc.save();
        return { success: true, message: "password changed successfully" };
      }
    } catch (error) {
      console.error("Error changing password:", error);
      throw new Error("Error changing password");
    }
  };
  

  const saveOTP = async (email: string, otp: number) => {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const userEmail = user.email;
        console.log(userEmail);
        const newOtp = new OTP({ userEmail: userEmail, otp: otp });
        await newOtp.save();
        console.log(newOtp);
      }
    } catch (error) {
      console.error("Error saving OTP:", error);
      throw new Error("Error saving OTP");
    }
  };
  
  const findOtpUser = async (email: string) => {
    try {
      const user = await OTP.findOne({ userEmail: email });
      if (user) {
        return user.otp;
      } else {
        throw new Error('user not found');
      }
    } catch (error) {
      console.error("Error finding OTP user:", error);
      throw new Error("Error finding OTP user");
    }
  };
  

  const pledge = async(campaignId:string,payment:number,userEmail:string)=>{
    try {
      await Payment.create({campaignId,payment,userEmail})
      return await Basics.findOneAndUpdate({_id:campaignId},{$inc:{currentAmount:payment,backers:1}},{new:true})
    } catch (error) {
      console.log(error)
    }
  }

 const fetchChannelsId = async(userEmail:string)=>{
  try {
    return await Payment.find({userEmail:userEmail},{_id:0,campaignId:1})
    
  } catch (error) {
    console.log(error)
  }
 }

 const fetchChannelData = async(campaignId:string|undefined)=>{
  try{

    const id = new ObjectId(campaignId);
      return await Basics.aggregate([
        {
          $match: { _id: id },
        },
        {
          $project:{
          _id:1,
          title:1,
          image:1
          }
        }
        
      ]);

  }catch(error){
    console.log(error)
  }
 }

 const saveChat = async(chat:ChatInterface)=>{
  try{

    return await Chat.create(chat)
  }catch(error){
    console.log(error)
    throw new Error('cannot save chat')
  }


 }


 const getChats = async(campaignId:string)=>{
  try{

    return await Chat.find({campaignId})
  }catch(error){
    console.log(error)
    throw new Error('cannot get chats')
  }
 }



  
  return {
    addUser,
    findByEmail,
    findById,
    saveUser,
    forgotPassword,
    saveOTP,
    findOtpUser,
    pledge,
    fetchChannelsId,
    fetchChannelData,
    saveChat,
    getChats
  };
};

export type UserDbMethods = typeof userDbMethods;
