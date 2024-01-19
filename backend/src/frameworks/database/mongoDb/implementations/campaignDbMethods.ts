import { campaign_advanced } from "../../../../entities/AdvancedInterface";
import { campaign_Basics } from "../../../../entities/BaiscsInterface";
import { Advanced } from "../model/campaign/advancedSchema";
import { Basics } from "../model/campaign/basicSchema";

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

  return {
    listBasics,
    createBasics,
    createAdvanced,
  };
};

export type CampaignDbMethods = typeof campaignDbMethods;
