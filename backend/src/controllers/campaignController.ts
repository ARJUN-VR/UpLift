import { Request, Response } from "express";
import asyncHandler from 'express-async-handler'
import { CampaignDbInterface } from "../application/repository/campaignDbRepository";
import { CampaignDbMethods } from "../frameworks/database/mongoDb/implementations/campaignDbMethods";
import { campaign_Basics } from "../entities/BaiscsInterface";
import { campaignUsecase } from "../application/usecases/campaignUsecases";

export const campaignController =(dbInterface:CampaignDbInterface,dbImplements:CampaignDbMethods)=>{
    const dbRepositoryCampaign = dbInterface(dbImplements())

    //desc getting basics for the homepage
    //route POST /api/user/get-campaigns
    //access public
    const listCampaigns = asyncHandler(async(req:Request,res:Response)=>{
       const basicDetails = await campaignUsecase(dbRepositoryCampaign).listCampaigns()
       res.status(200).json({basicDetails})
    })

    const createBasics = asyncHandler(async(req:Request,res:Response)=>{
        const basicData:campaign_Basics = req.body;
        await 
    })

    return{
        listCampaigns
    }
}