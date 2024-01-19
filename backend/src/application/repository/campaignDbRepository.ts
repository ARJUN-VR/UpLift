import { campaign_advanced } from "../../entities/AdvancedInterface";
import { campaign_Basics } from "../../entities/BaiscsInterface";
import { RewardInterface } from "../../entities/RewardInterface";
import { CampaignDbMethods } from "../../frameworks/database/mongoDb/implementations/campaignDbMethods";



export const campaignDbInterface = (
  repository: ReturnType<CampaignDbMethods>
) => {
  const listCampaigns = async () => {
    return await repository.listBasics();
  };

  const createBasics = async (basics: campaign_Basics) => {
    return await repository.createBasics(basics);
  };

  const createAdvanced = async (advanced: campaign_advanced) => {
    return await repository.createAdvanced(advanced);
  };

  const createReward = async(reward:RewardInterface)=>{
    return await repository.createReward(reward)
  }

  return {
    listCampaigns,
    createBasics,
    createAdvanced,
    createReward
  };
};

export type CampaignDbInterface = typeof campaignDbInterface
