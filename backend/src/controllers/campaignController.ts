import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { CampaignDbInterface } from "../application/repository/campaignDbRepository";
import { CampaignDbMethods } from "../frameworks/database/mongoDb/implementations/campaignDbMethods";
import { campaign_Basics } from "../entities/BaiscsInterface";
import { campaignUsecase } from "../application/usecases/campaignUsecases";
import { campaign_advanced } from "../entities/AdvancedInterface";
import { RewardInterface } from "../entities/RewardInterface";
import { CommentInterface } from "../entities/CommentInterface";

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
  const createReward = asyncHandler(async (req: Request, res: Response) => {
    const rewardData: RewardInterface = req.body;
    const imgRes = await campaignUsecase(dbRepositoryCampaign).uploadImage(
      rewardData.image
    );
    if (imgRes) {
      rewardData.image = imgRes.secure_url;
    }
    const reward = await campaignUsecase(dbRepositoryCampaign).createReward(
      rewardData
    );
    res.status(200).json({ reward });
  });

  //desc   fetching full campaign informations
  //route  GET  /api/user/getCampaign
  //access public
  const getCampaign = asyncHandler(async (req: Request, res: Response) => {
    const Id = req.params.basicId;
    console.log(Id, "iddddd");
    const campaign = await campaignUsecase(dbRepositoryCampaign).getCampaign(
      Id
    );
    res.status(200).json({ campaign });
  });

  //desc   fetching campaigns based on category
  //route  GET  /api/user/get-category
  //access public
  const getCategory = asyncHandler(async (req: Request, res: Response) => {
    const category = req.params.category;
    const list = await campaignUsecase(dbRepositoryCampaign).getCategory(
      category
    );
    res.status(200).json({ list });
  });

  //desc   write comment
  //route  POST  /api/user/comment
  //access private
  const addComment = asyncHandler(async (req: Request, res: Response) => {
    const CommentData: CommentInterface = req.body;
    const data = await campaignUsecase(dbRepositoryCampaign).addComment(
      CommentData
    );
    res.status(200).json({ data });
  });

  //desc   fetching comments
  //route  GET  /api/user/comment
  //access public
  const listComments = asyncHandler(async (req: Request, res: Response) => {
    const id: string | undefined = req.params.campaignId;
    const modifiedId = id.slice(1)
    const comments = await campaignUsecase(dbRepositoryCampaign).listComments(
      modifiedId
    );
    res.status(200).json({ comments });
  });


  //desc   fetching appropriate reward
  //route  GET  /api/user/reward
  //access public
  const getReward = asyncHandler(async(req:Request,res:Response)=>{
    const id:string  = req.params.basicId
    console.log(id)
    const reward = await campaignUsecase(dbRepositoryCampaign).getReward(id)
    res.status(200).json({reward})
  })

  const listCategory = asyncHandler(async(req:Request,res:Response)=>{
    const list = await campaignUsecase(dbRepositoryCampaign).listCategory()
    res.status(200).json({message:'fetched',list})
  })


  const getDashboardData = asyncHandler(async(req:Request,res:Response)=>{
    const {creatorEmail} = req.params;
    const data = await campaignUsecase(dbRepositoryCampaign).getDashboardData(creatorEmail)
    res.status(200).json({message:'data retrieved successfully',data})
  })


  const getPaymentData = asyncHandler(async(req:Request,res:Response)=>{
    const {campaignId} = req.params;
    console.log(campaignId)
    const paymentData = await campaignUsecase(dbRepositoryCampaign).getPaymentData(campaignId)
    res.status(200).json({message:'fetched successfully',paymentData})
  })

  const getSearchResult = asyncHandler(async(req:Request,res:Response)=>{
    const {query} = req.params;
    const result = await campaignUsecase(dbRepositoryCampaign).search(query)
    res.status(200).json({result})
  })

  const HandleLIve = asyncHandler(async(req:Request,res:Response)=>{
    const {campaignId} = req.body;
    const result = await campaignUsecase(dbRepositoryCampaign).HandleLIve(campaignId)
    res.status(200).json({message:'succesfuly updated',result})
  })





  return {
    listCampaigns,
    createBasics,
    createAdvanced,
    createReward,
    getCampaign,
    getCategory,
    addComment,
    listComments,
    getReward,
    listCategory,
    getDashboardData,
    getPaymentData,
    getSearchResult,
    HandleLIve

  };
};
