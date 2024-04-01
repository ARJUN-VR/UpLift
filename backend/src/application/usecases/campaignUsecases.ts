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
    try {
      return await repository.listCampaigns();
    } catch (error) {
      console.error("Error listing campaigns:", error);
     
    }
  };
  
  const createBasics = async (basics: campaign_Basics) => {
    try {
      const count: number | undefined = await repository.getNotificationCount();
      let newCount = 0;
  
      if (count) {
        newCount = count + 1;
      }
  
      emitEventToClient(io, 'notification', newCount);
      return await repository.createBasics(basics);
    } catch (error) {
      console.error("Error creating basics:", error);
     
    }
  };
  
  const createAdvanced = async (advanced: campaign_advanced) => {
    try {
      return await repository.createAdvanced(advanced);
    } catch (error) {
      console.error("Error creating advanced:", error);
      
    }
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

  const createReward = async (reward: RewardInterface) => {
    try {
      return await repository.createReward(reward);
    } catch (error) {
      console.error("Error creating reward:", error);
    }
  };
  
  const getCampaign = async (id: string) => {
    try {
      console.log(id, 'usecase');
      return await repository.getCampaign(id);
    } catch (error) {
      console.error("Error getting campaign:", error);
    }
  };
  
  const getCategory = async (category: string) => {
    try {
      return await repository.getCategory(category);
    } catch (error) {
      console.error("Error getting category:", error);
    }
  };
  
  const addComment = async (commentData: CommentInterface) => {
    try {
      return await repository.addComment(commentData);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  
  const listComments = async (id: string) => {
    try {
      return await repository.listComments(id);
    } catch (error) {
      console.error("Error listing comments:", error);
    }
  };
  
  const getReward = async (id: string) => {
    try {
      return await repository.getReward(id);
    } catch (error) {
      console.error("Error getting reward:", error);
    }
  };
  
  const listCategory = async () => {
    try {
      return await repository.listCategory();
    } catch (error) {
      console.error("Error listing categories:", error);
    }
  };
  
  const getDashboardData = async (creatorEmail: string) => {
    try {
      return await repository.getDashboardData(creatorEmail);
    } catch (error) {
      console.error("Error getting dashboard data:", error);
    }
  };
  
  const getPaymentData = async (campaignId: string) => {
    try {
      return await repository.getPaymentData(campaignId);
    } catch (error) {
      console.error("Error getting payment data:", error);
    }
  };
  
  const search = async (query: string) => {
    try {
      return await repository.search(query);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };
  
  const HandleLIve = async (campaignId: string) => {
    try {
      return await repository.HandleLIve(campaignId);
    } catch (error) {
      console.error("Error handling live campaign:", error);
    }
  };
  




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
    search,
    HandleLIve
  };
};
