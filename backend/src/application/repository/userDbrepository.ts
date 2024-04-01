
import { ChatInterface } from "../../entities/Chat";
import { userInterface } from "../../entities/User";
import { UserDbMethods } from "../../frameworks/database/mongoDb/implementations/userDbMethods";
import {Request,Response} from 'express'



export const userDbInterface = (repository: ReturnType<UserDbMethods>) => {
  const adduser = async (user: userInterface) => {
    try {
      return await repository.addUser(user);
    } catch (error) {
      console.error("Error adding user:", error);
      throw new Error("Error adding user");
    }
  };
  
  const findByEmail = async (email: string) => {
    try {
      const user = await repository.findByEmail(email);
      return user;
    } catch (error) {
      console.error("Error ", error);
      throw new Error("Error finding user by email");
    }
  };
  
  const findById = async (id: string) => {
    try {
      return await repository.findById(id);
    } catch (error) {
      console.error("Error ", error);
      throw new Error("Error finding user by id");
    }
  };
  
  const saveUser = async (req: Request) => {
    try {
      return await repository.saveUser(req);
    } catch (error) {
      console.error("Error", error);
      throw new Error("Error saving user");
    }
  };
  
  const forgotPassword = async (email: string, password: string) => {
    try {
      return await repository.forgotPassword(email, password);
    } catch (error) {
      console.error("Error", error);
      throw new Error("Error forgot password");
    }
  };
  
  const saveOtp = async (email: string, otp: number) => {
    try {
      await repository.saveOTP(email, otp);
    } catch (error) {
      console.error("Error ", error);
      throw new Error("Error saving OTP");
    }
  };
  
  const findOtpUser = async (email: string) => {
    try {
      return await repository.findOtpUser(email);
    } catch (error) {
      console.error("Error finding user:", error);
      throw new Error("Error finding  user");
    }
  };
  
  const pledge = async (campaignId: string, payment: number, userEmail: string) => {
    try {
      return await repository.pledge(campaignId, payment, userEmail);
    } catch (error) {
      console.error("Error pledging:", error);
      throw new Error("Error pledging");
    }
  };
  
  const fetchChannelsId = async (userEmail: string) => {
    try {
      return await repository.fetchChannelsId(userEmail);
    } catch (error) {
      console.error("Error fetching channels", error);
      throw new Error("Error fetching channels ");
    }
  };
  
  const fetchChannelData = async (campaignId: string | undefined) => {
    try {
      return await repository.fetchChannelData(campaignId);
    } catch (error) {
      console.error("Error fetching channel data:", error);
      throw new Error("Error fetching channel data");
    }
  };
  
  const saveChat = async (chat: ChatInterface) => {
    try {
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
      console.error("Error getting chats:", error);
      throw new Error("Error getting chats");
    }
  };
  


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
