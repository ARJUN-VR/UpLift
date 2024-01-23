import { campaign_advanced } from "../../../../entities/AdvancedInterface";
import { campaign_Basics } from "../../../../entities/BaiscsInterface";
import { RewardInterface } from "../../../../entities/RewardInterface";
import { Advanced } from "../model/campaign/advancedSchema";
import { Basics } from "../model/campaign/basicSchema";
import { Reward } from "../model/campaign/rewardSchema";
import { ObjectId } from "mongodb";



export const campaignDbMethods = () => {


  const getAllBasics = async () => {
    return await Basics.find();
  };

  const getCampaign = async(id:string)=>{
    try {
      const campaignid = new ObjectId(id)
      return await Basics.aggregate([
        {
          $match: { _id: campaignid }
        },
        {
          $lookup: {
            from: 'campaign_advanceds',
            localField: '_id',
            foreignField: 'basicId',
            as: 'advancedData'
          }
        },
        {
          $lookup: {
            from: 'rewards',
            localField: '_id',
            foreignField: 'basicId',
            as: 'rewardData'
          }
        }
      ]);
    } catch (error) {
      console.error('Error in getCampaign:', error);
      throw error; 
    }
  }

 
  const createBasics = async (basics: campaign_Basics) => {
    return await Basics.create(basics);
  };

  const createAdvanced = async (advanced: campaign_advanced) => {
    return await Advanced.create(advanced);
  };

  const createReward = async (reward: RewardInterface) => {
    return await Reward.create(reward);
  };

  return {
    getAllBasics,
    createBasics,
    createAdvanced,
    createReward,
    getCampaign
  };
};

export type CampaignDbMethods = typeof campaignDbMethods;
