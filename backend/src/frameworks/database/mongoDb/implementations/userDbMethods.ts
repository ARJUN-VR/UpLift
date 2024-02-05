import { userInterface } from "../../../../entities/User";
import { User } from "../model/userSchema";
import { Document } from "mongoose";
import { OTP } from "../model/otpSchema";
import { Basics } from "../model/campaign/basicSchema";


export const userDbMethods = () => {
  const addUser = async (user: userInterface) => {
    return await User.create(user);
  };

  const findByEmail = async (email: string) => {
    const user = await User.findOne({ email: email });
    return user;
  };

  
  const findById = async (id: string) => {
    return await User.findOne({ _id: id });
  };



  const saveUser = async (req: any) => {
    const user = await User.findById({ _id: req.user._id });
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;

      return await user.save();
    }
  };

  const forgotPassword = async (email: string, password: string) => {
    const user: userInterface | null = await User.findOne({ email: email });
    if (!user) {
      return { success: false, error: "user not found" };
    } else {
      const userDoc = user as Document & userInterface;
      console.log(password,'before')

      userDoc.password = password;
      console.log(userDoc.password,'after')
      await userDoc.save();
      return { success: true, message: "passowrd changed succesfully" };
    }
  };

  const saveOTP =async(email:string,otp:number)=>{
        const user = await User.findOne({email:email})
        if(user){
          const userEmail = user.email
          console.log(userEmail)
          const newOtp = new OTP({userEmail:userEmail,otp:otp})
          await newOtp.save()
          console.log(newOtp)
        }

  }

  const findOtpUser = async(email:string)=>{
    const user =  await OTP.findOne({userEmail:email})
    if(user){
      return user.otp
    }else{
      throw new Error('user not found')
    }
  }

  const pledge = async(id:string,amount:number)=>{
    try {
      return await Basics.findOneAndUpdate({_id:id},{$inc:{currentAmount:amount,backers:1}},{new:true})
    } catch (error) {
      console.log(error)
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
    pledge
  };
};

export type UserDbMethods = typeof userDbMethods;
