import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { CampaignDbInterface } from "../application/repository/campaignDbRepository";
import { CampaignDbMethods } from "../frameworks/database/mongoDb/implementations/campaignDbMethods";
import { campaign_Basics } from "../entities/BaiscsInterface";
import { campaignUsecase } from "../application/usecases/campaignUsecases";
import { campaign_advanced } from "../entities/AdvancedInterface";
import { RewardInterface } from "../entities/RewardInterface";

export const campaignController = (
  dbInterface: CampaignDbInterface,
  dbImplements: CampaignDbMethods
) => {
  const dbRepositoryCampaign = dbInterface(dbImplements());

  //desc getting basics for the homepage
  //route POST /api/user/get-campaigns
  //access public
  const listCampaigns = asyncHandler(async (req: Request, res: Response) => {
    const basicDetails = await campaignUsecase(
      dbRepositoryCampaign
    ).listCampaigns();
    res.status(200).json({ basicDetails });
  });


  //desc campaign basic details
  //route POST /api/user/create_basics
  //access private
  const createBasics = asyncHandler(async (req: Request, res: Response) => {
    const basicData: campaign_Basics = req.body;
    const imgRes = await campaignUsecase(dbRepositoryCampaign).uploadImage(
      basicData.image
    );
    if (imgRes) {
      basicData.image = imgRes.secure_url;
    }
    const data = await campaignUsecase(dbRepositoryCampaign).createBasics(
      basicData
    );
    res.status(200).json({ message: "created successfully", data });
  });

  //desc campaign advanced details
  //route POST /api/user/create_advanced
  //access private
  const createAdvanced = asyncHandler(async (req: Request, res: Response) => {
    const advancedData: campaign_advanced = req.body;
    const imgRes = await campaignUsecase(dbRepositoryCampaign).uploadImage(
      advancedData?.thumbnail
    );
    const videoRes = await campaignUsecase(dbRepositoryCampaign).videoUpload(
      advancedData?.video
    );
    if (imgRes) {
      advancedData.thumbnail = imgRes.secure_url;
    }
    if (videoRes) {
      advancedData.video = videoRes.secure_url;
    }
    const data = await campaignUsecase(dbRepositoryCampaign).createAdvanced(
      advancedData
    );
    res.status(200).json({ message: "success", data });
  });

  //desc create reward
  //route POST /api/user/create-reward
  //access private
  const createReward = asyncHandler(async(req:Request,res:Response)=>{
    const rewardData:RewardInterface = req.body;
    const imgRes = await campaignUsecase(dbRepositoryCampaign).uploadImage(rewardData.image)
    if(imgRes){
      rewardData.image = imgRes.secure_url
    }
    const reward = await campaignUsecase(dbRepositoryCampaign).createReward(rewardData)
    res.status(200).json({reward})
  })
 
  //desc   fetching full campaign informations
  //route  GET  /api/user/getCampaign
  //access public   
  const getCampaign = asyncHandler(async(req:Request,res:Response)=>{
    const Id = req.params.basicId
    console.log(Id)
    const campaign = await campaignUsecase(dbRepositoryCampaign).getCampaign(Id)
    res.status(200).json({campaign})
  })


  return {
    listCampaigns,
    createBasics,
    createAdvanced,
    createReward,
    getCampaign
  };
};
