import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React from "react";
import { User } from "./components/adminComponents/UserList";

export type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>



export interface Campaign {
    _id: string;
    title: string;
    tagline: string;
    category: string;
    story: string;
    image: string;
    target: number;
    duration: string;
    location: string;
    userEmail: string;
    currentAmount:number
  }

  export interface BasicInterface{
    title:string;
    category:string;
    tagline:string;
    story:string;
    location:string;
  
  }

  export interface CampaignViewAdvancedInterface{

    thumbnail: string;
    story: string;
  
  }

  export interface CustomError extends Error {
    data?: {
      message?: string;
    };
  }
  
  export interface SuccessResult {
    data: {
      message: string;
      user: User;
    }
  }
  
  export interface ErrorResult {
    error: FetchBaseQueryError | SerializedError;
  }

  export type Result = SuccessResult|ErrorResult



  export interface AdvancedData {
    _id: string;
    video: string;
    basicId: string;
    thumbnail: string;
    story: string;
    __v: number;
    // You can add more properties as needed
  }
  
  export interface RewardData {
    _id: string;
    basicId: string;
    title: string;
    image: string;
    pledgeAmount: number;
    rewardList: string[];
    claims: number;
    __v: number;
    // You can add more properties as needed
  }
  
  export interface CampaignData {
    _id: string;
    title: string;
    tagline: string;
    category: string;
    image: string;
    target: number;
    location: string;
    duration: string;
    isVerified: boolean;
    __v: number;
    currentAmount: number;
    backers: number;
    isListed: boolean;
    isLive: boolean;
    updatedAt: string;
    advancedData: AdvancedData[];
    rewardData: RewardData[];
    // You can add more properties as needed
  }
  
  export interface Data {
    campaign: CampaignData[];
    // You can add more properties as needed
  }
  
  interface CampDataResponseSuccess {
    data: Data;
  }
  
  interface CampDataResponseError {
    error: any; // You can refine this type based on the actual error structure
  }
  
  export type CampDataResponse = CampDataResponseSuccess | CampDataResponseError;
  

  