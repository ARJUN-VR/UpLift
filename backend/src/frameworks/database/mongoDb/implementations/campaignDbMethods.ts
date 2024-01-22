import { campaign_advanced } from "../../../../entities/AdvancedInterface";
import { campaign_Basics } from "../../../../entities/BaiscsInterface";
import { RewardInterface } from "../../../../entities/RewardInterface";
import { Advanced } from "../model/campaign/advancedSchema";
import { Basics } from "../model/campaign/basicSchema";
import { Reward } from "../model/campaign/rewardSchema";

export const campaignDbMethods = () => {
  const listBasics = async () => {
    return await Basics.find();
  };

  const createBasics = async (basics: campaign_Basics) => {
    return await Basics.create(basics);
  };

  const createAdvanced = async (advanced: campaign_advanced) => {
    return await Advanced.create(advanced);
  };

  const createReward = async(reward:RewardInterface)=>{
    return await Reward.create(reward)
  }

  return {
    listBasics,
    createBasics,
    createAdvanced,
    createReward
  };
};

export type CampaignDbMethods = typeof campaignDbMethods;
