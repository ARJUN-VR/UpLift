import { campaign_advanced } from "../../entities/AdvancedInterface";
import { campaign_Basics } from "../../entities/BaiscsInterface";
import { CommentInterface } from "../../entities/CommentInterface";
import { RewardInterface } from "../../entities/RewardInterface";
import { CampaignDbInterface } from "../repository/campaignDbRepository";
import cloudinary from "cloudinary";
import { emitEventToClient } from "../services/socketService";
import { io } from "../../app";

export const campaignUsecase = (
  repository: ReturnType<CampaignDbInterface>
) => {
  const listCampaigns = async () => {
    return await repository.listCampaigns();
  };
  

  const createBasics = async (basics: campaign_Basics) => {
    const count:number | undefined = await repository.getNotificationCount()
    let newCount=0
    if(count){
      newCount = count + 1
    }
    emitEventToClient(io,'notification',newCount)
    return await repository.createBasics(basics);
  };

  const createAdvanced = async (advanced: campaign_advanced) => {
    return await repository.createAdvanced(advanced);
  };

  const uploadImage = async (imgUrl: string) => {
    try {
      return await cloudinary.v2.uploader.upload(imgUrl);
    } catch (error) {
      console.log(error, "error in image uplaoding usecase");
    }
  };

  const videoUpload = async (videoUrl: string) => {
    try {
      return await cloudinary.v2.uploader.upload(videoUrl, {
        resource_type: "video",
      });
    } catch (error) {
      console.log(error, "error in video uploader");
    }
  };

  const createReward = async(reward:RewardInterface)=>{
    return await repository.createReward(reward)
  }

  const getCampaign = async(id:string)=>{
    console.log(id,'usecase')
    return await repository.getCampaign(id)
  }


  const getCategory = async(category:string)=>{
    return await repository.getCategory(category)
  }

  const addComment = async(commentData:CommentInterface)=>{
    return await repository.addComment(commentData)
  }

  const listComments = async(id:string)=>{
    return await repository.listComments(id)
  }

  const getReward = async(id:string)=>{
    return await repository.getReward(id)
  }

  const listCategory = async()=>{
    return await repository.listCategory()
  }

  const getDashboardData = async(creatorEmail:string)=>{
    return await repository.getDashboardData(creatorEmail)
  }

  const getPaymentData = async(campaignId:string)=>{
    return await repository.getPaymentData(campaignId)
  }

  const getSearchData = async()=>{
    return await repository.getSearchData()
  }




  return {
    listCampaigns,
    createBasics,
    createAdvanced,
    uploadImage,
    videoUpload,
    createReward,
    getCampaign,
    getCategory,
    addComment,
    listComments,
    getReward,
    listCategory,
    getDashboardData,
    getPaymentData,
    getSearchData
  };
};
