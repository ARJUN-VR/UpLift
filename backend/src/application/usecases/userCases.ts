import { UserDbInterFace } from "../repository/userDbrepository";
import { userInterface } from "../../entities/User";
import generateToken from "../services/generateJwt";
import OTPService from "../services/otpGeneration";
import cloudinary from 'cloudinary'
import { ChatInterface } from "../../entities/Chat";

interface IdType{
  campaignId?:string | null | undefined

}



export const userCases = (repository: ReturnType<UserDbInterFace>) => {
  const findByEmail = async (email: string) =>
    await repository.findByEmail(email);

  const addUser = async (user: userInterface) => {
    const newEmail = user.email;
    const email = await repository.findByEmail(newEmail);

    if (email) {
      return false;
    } else {
      return await repository.adduser(user);
    }
  };

  const userSignIn = async (email: string, password: string, res: any) => {
    const user: userInterface | null = await repository.findByEmail(email);

    if (!user) {
      return { success: false, error: "no user found" };
    }
    if ('isBlocked' in user && user.isBlocked) {
      return {success : false , error:'user blocked'}
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
  };

  const userSignout = (res: any) => {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
  };

  const updateProfile = async (req: any) => {
    return await repository.saveUser(req);
  };

  const forgotPassword = async (email: string, password: string) => {
    return await repository.forgotPassword(email, password);
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

  
  const pledge = async(campaignId:string,payment:number,userEmail:string)=>{
    return await repository.pledge(campaignId,payment,userEmail)
  }

  

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


  const saveChat = async(chat:ChatInterface)=>{
    if(chat.image){
      try{
       const imageRes =  await uploadImage(chat.image)
       chat.image = imageRes?.secure_url
      }catch(error){
        console.log(error)
      }
    }
    return await repository.saveChat(chat)
  }

  const getChats = async(campaignId:string)=>{
    return await repository.getChats(campaignId)
  }

  


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
