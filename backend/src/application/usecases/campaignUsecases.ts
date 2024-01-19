import { campaign_advanced } from "../../entities/AdvancedInterface";
import { campaign_Basics } from "../../entities/BaiscsInterface";
import { CampaignDbInterface } from "../repository/campaignDbRepository";


export const campaignUsecase = (repository:ReturnType<CampaignDbInterface>)=>{
    
  const listCampaigns = async()=>{
    return await repository.listCampaigns()
  }

  const createBasics = async(basics:campaign_Basics)=>{
   return await repository.createBasics(basics)
  }

  const createAdvanced = async(advanced:campaign_advanced)=>{
    return await repository.createAdvanced(advanced)
  }

  return {
    listCampaigns,
    createBasics,
    createAdvanced
  }

}