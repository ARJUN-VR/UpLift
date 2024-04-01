import { UserDbInterFace } from "../repository/userDbrepository";
import { userInterface } from "../../entities/User";
import generateToken from "../services/generateJwt";
import OTPService from "../services/otpGeneration";
import cloudinary from 'cloudinary'
import { ChatInterface } from "../../entities/Chat";
import {Request,Response} from 'express'

interface IdType{
  campaignId?:string | null | undefined

}



export const userCases = (repository: ReturnType<UserDbInterFace>) => {
  const findByEmail = async (email: string) =>
    await repository.findByEmail(email);

const addUser = async (user: userInterface) => {
  try {
    const newEmail = user.email;
    const email = await repository.findByEmail(newEmail);

    if (email) {
      return false;
    } else {
      return await repository.adduser(user);
    }
  } catch (error) {
    console.error("Error adding user:", error);
    throw new Error("Error adding user");
  }
};

const userSignIn = async (email: string, password: string, res: Response) => {
  try {
    const user: userInterface | null = await repository.findByEmail(email);

    if (!user) {
      return { success: false, error: "no user found" };
    }

    if ('isBlocked' in user && user.isBlocked) {
      return { success: false, error: 'user blocked' };
    }

    if (user && typeof user.matchPassword === "function") {
      if (await user.matchPassword(password)) {
        generateToken(res, user);
        return { success: true, user };
      } else {
        return { success: false, error: "Incorrect password" };
      }
    } else {
      return { success: false, error: "Unable to verify password" };
    }
  } catch (error) {
    console.error("Error signing in:", error);
    throw new Error("Error signing in");
  }
};


const userSignout = (res: Response) => {
  try {
    res.cookie("accessToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.cookie('refreshToken', '', {
      httpOnly: true,
      expires: new Date(0)
    });
  } catch (error) {
    console.error("Error signing out:", error);
    throw new Error("Error signing out");
  }
};

const updateProfile = async (req: Request) => {
  try {
    return await repository.saveUser(req);
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Error updating profile");
  }
};


const forgotPassword = async (email: string, password: string) => {
  try {
    return await repository.forgotPassword(email, password);
  } catch (error) {
    console.error("Error resetting password:", error);
    throw new Error("Error resetting password");
  }
};

  const verifyUserAndSendOtp = async (email: string) => {
    try {
      const user = await repository.findByEmail(email);
      if (user) {
        const otp: number = await OTPService(email);
        await repository.saveOtp(email, otp);
        return { success: true, message: "OTP Sent succesfully" };
      } else {
        return { success: false, message: "user not found" };
      }
    } catch (error) {
      console.log(error);
      throw new Error("OTP send failed");
    }
  };

  const verifyOtp = async(email:string,otp:number)=>{
    try{
      const storedOtp = await repository.findOtpUser(email)
      console.log(storedOtp,'stored')
      console.log(otp,'entered otp')
      if(storedOtp){
        if(storedOtp===otp){
          console.log('success')
          return {success:true ,message:'otp verified'}
        }else{
          console.log('fails')
          return {success:false,message:'invalid otp'}
        }
      }
    }catch(error){
       throw new Error('error while otp verification')
     }
   
  }

  const uploadImage = async(imgUrl:string)=>{
    try{
      return await cloudinary.v2.uploader.upload(imgUrl)
    }catch(error){
      console.log(error,'error in image uplaoding usecase')
    }
  
  }

  const videoUpload = async(videoUrl:string)=>{
    try {
      return await cloudinary.v2.uploader.upload(videoUrl,{resource_type:'video'})
    } catch (error) {
      console.log(error,'error in video uploader')
    }
  }

  
  const pledge = async (campaignId: string, payment: number, userEmail: string) => {
    try {
      return await repository.pledge(campaignId, payment, userEmail);
    } catch (error) {
      console.error("Error pledging:", error);
      throw new Error("Error pledging");
    }
  };
  
  

  const getChannels = async(userEmail:string)=>{
    try{
     const channelIDs:IdType[] | undefined = await repository.fetchChannelsId(userEmail)
    

      const channelData = []
      if(channelIDs){
        for(let id of channelIDs){
          const data =  await repository.fetchChannelData(id.campaignId?.toString())
          channelData.push(data)
            
          }
      }

      return channelData
    

    }catch(error){
      console.log(error)
    }

  }


  const saveChat = async (chat: ChatInterface) => {
    try {
      if (chat.image) {
        const imageRes = await uploadImage(chat.image);
        chat.image = imageRes?.secure_url;
      } else if (chat.video) {
        const videoRes = await cloudinary.v2.uploader.upload(chat.video, {
          resource_type: "video",
        });
        chat.video = videoRes?.secure_url;
      }
      
      return await repository.saveChat(chat);
    } catch (error) {
      console.error("Error saving chat:", error);
      throw new Error("Error saving chat");
    }
  };
  

  const getChats = async (campaignId: string) => {
    try {
      return await repository.getChats(campaignId);
    } catch (error) {
      console.error("Error fetching chats:", error);
      throw new Error("Error fetching chats");
    }
  };
  

  


  return {
    findByEmail,
    addUser,
    userSignIn,
    userSignout,
    updateProfile,
    forgotPassword, 
    verifyUserAndSendOtp,
    verifyOtp,
    uploadImage,
    videoUpload,
    pledge,
    getChannels,
    saveChat,
    getChats
  };
};
