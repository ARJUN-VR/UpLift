import { campaignInterface } from "../../entities/Campaign";
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

  const createCampaign = async(campaign:campaignInterface)=>{
    await repository.createCampaign(campaign)
  }

  const listCampaigns = async()=>{
    return await repository.listCampaigns()
  }

  return {
    adduser,
    findByEmail,
    findById,
    saveUser,
    forgotPassword,
    saveOtp,
    findOtpUser,
    createCampaign,
    listCampaigns
  };
};

export type UserDbInterFace = typeof userDbInterface;
