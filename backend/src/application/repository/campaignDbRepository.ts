import { campaign_advanced } from "../../entities/AdvancedInterface";
import { campaign_Basics } from "../../entities/BaiscsInterface";
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

  return {
    listCampaigns,
    createBasics,
    createAdvanced,
  };
};

export type CampaignDbInterface = typeof campaignDbInterface
