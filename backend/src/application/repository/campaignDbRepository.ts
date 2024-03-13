import { campaign_advanced } from "../../entities/AdvancedInterface";
import { campaign_Basics } from "../../entities/BaiscsInterface";
import { CommentInterface } from "../../entities/CommentInterface";
import { RewardInterface } from "../../entities/RewardInterface";
import { CampaignDbMethods } from "../../frameworks/database/mongoDb/implementations/campaignDbMethods";



export const campaignDbInterface = (
  repository: ReturnType<CampaignDbMethods>
) => {
  const listCampaigns = async () => {
    return await repository.getAllBasics();
  };
  
  const getCampaign = async(id:string)=>{
    return await repository.getCampaign(id)
  }
  const createBasics = async (basics: campaign_Basics) => {
    return await repository.createBasics(basics);
  };

  const createAdvanced = async (advanced: campaign_advanced) => {
    return await repository.createAdvanced(advanced);
  };

  const createReward = async(reward:RewardInterface)=>{
    return await repository.createReward(reward)
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

  const getNotificationCount = async()=>{
    return await repository.getNotificationCount()
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

  const search = async(query:string)=>{
    return await repository.search(query)
  }

  const HandleLIve = async(campaignId:string)=>{
    return await repository.HandleLIve(campaignId)
  }




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
    getNotificationCount,
    listCategory,
    getDashboardData,
    getPaymentData,
    search,
    HandleLIve
   
  };
};

export type CampaignDbInterface = typeof campaignDbInterface
