
import { ChatInterface } from "../../entities/Chat";
import { userInterface } from "../../entities/User";
import { UserDbMethods } from "../../frameworks/database/mongoDb/implementations/userDbMethods";


export const userDbInterface = (repository: ReturnType<UserDbMethods>) => {
  const adduser = async (user: userInterface) => {
    return await repository.addUser(user);
  };

  const findByEmail = async (email: string) => {
    const user = await repository.findByEmail(email);
    return user;
  };
  const findById = async (id: string) => {
    return await repository.findById(id);
  };
  const saveUser = async (req: any) => {
    return await repository.saveUser(req);
  };

  const forgotPassword = async (email: string, password: string) => {
    return await repository.forgotPassword(email, password);
  };

  const saveOtp = async (email: string, otp: number) => {
    await repository.saveOTP(email, otp);
  };

  const findOtpUser = async(email:string)=>{
    return await repository.findOtpUser(email)
  }
  
  
  const pledge = async(campaignId:string,payment:number,userEmail:string)=>{
    return await repository.pledge(campaignId,payment,userEmail)
  }

  const fetchChannelsId = async(userEmail:string)=>{
    return await repository.fetchChannelsId(userEmail)
  }

  const fetchChannelData = async(campaignId:string|undefined)=>{
    return await repository.fetchChannelData(campaignId)
  }

  const saveChat = async(chat:ChatInterface)=>{
    return await repository.saveChat(chat)
  }

  const getChats = async(campaignId:string)=>{
    return await repository.getChats(campaignId)
  }



  return {
    adduser,
    findByEmail,
    findById,
    saveUser,
    forgotPassword,
    saveOtp,
    findOtpUser,
    pledge,
    fetchChannelsId,
    fetchChannelData,
    saveChat,
    getChats
  };
};

export type UserDbInterFace = typeof userDbInterface;
