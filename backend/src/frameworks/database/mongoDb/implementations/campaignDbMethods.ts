import { campaign_advanced } from "../../../../entities/AdvancedInterface";
import { campaign_Basics } from "../../../../entities/BaiscsInterface";
import { CommentInterface } from "../../../../entities/CommentInterface";
import { RewardInterface } from "../../../../entities/RewardInterface";
import { Advanced } from "../model/campaign/advancedSchema";
import { Basics } from "../model/campaign/basicSchema";
import { Comment } from "../model/campaign/commentSchema";
import { Reward } from "../model/campaign/rewardSchema";
import { ObjectId } from "mongodb";

export const campaignDbMethods = () => {
  const getAllBasics = async () => {
    try {

        return await Basics.find({isVerified:true});
 
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getCampaign = async (id: string) => {
    try {
      const campaignid = new ObjectId(id);
      return await Basics.aggregate([
        {
          $match: { _id: campaignid },
        },
        {
          $lookup: {
            from: "campaign_advanceds",
            localField: "_id",
            foreignField: "basicId",
            as: "advancedData",
          },
        },
        {
          $lookup: {
            from: "rewards",
            localField: "_id",
            foreignField: "basicId",
            as: "rewardData",
          },
        },
      ]);
    } catch (error) {
      console.error("Error in getCampaign:", error);
      throw error;
    }
  };

  const createBasics = async (basics: campaign_Basics) => {
    try {
      return await Basics.create(basics);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const createAdvanced = async (advanced: campaign_advanced) => {
    try {
      return await Advanced.create(advanced);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const createReward = async (reward: RewardInterface) => {
    try {
      return await Reward.create(reward);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getCategory = async (category: string) => {
    try {
    return await Basics.find({ category: category });
      
    } catch (error) {
      console.log(error)
    }
  };

  const addComment = async(commentData:CommentInterface)=>{
    try {
      console.log(commentData,'dataastatatatatata')
    return await Comment.create(commentData)
    } catch (error) {
      console.log(error)
    }
  }

  const listComments = async(id:string)=>{
    try{
   
    return  await Comment.find({campaignid:id})

    }catch(error){
      console.log(error)
    }
  }

  return {
    getAllBasics,
    createBasics,
    createAdvanced,
    createReward,
    getCampaign,
    getCategory,
    addComment,
    listComments
  };
};

export type CampaignDbMethods = typeof campaignDbMethods;
