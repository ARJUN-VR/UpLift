import { UserDbInterFace } from "../repository/userDbrepository";
import { userInterface } from "../../entities/User";
import generateToken from "../services/generateJwt";
import OTPService from "../services/otpGeneration";
import { campaignInterface } from "../../entities/Campaign";
import cloudinary from 'cloudinary'


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
      if(storedOtp){
        if(storedOtp===otp){
          return {success:true ,message:'otp verified'}
        }else{
          return {success:false,message:'invalid otp'}
        }
      }
    }catch(error){
       throw new Error('error while otp verification')
     }
   
  }

  const createCampaign = async(campaign:campaignInterface)=>{
    await repository.createCampaign(campaign)
  }

  const uploadImage = async(imgUrl:string)=>{
    try{
      console.log('image url: ',imgUrl)
      return await cloudinary.v2.uploader.upload(imgUrl)
    }catch(error){
      console.log(error)
    }
  
  }

  const listCampaigns = async()=>{
    return await repository.listCampaigns()
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
    createCampaign,
    uploadImage,
    listCampaigns
  };
};
