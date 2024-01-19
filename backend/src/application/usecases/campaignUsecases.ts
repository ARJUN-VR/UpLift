import { campaign_advanced } from "../../entities/AdvancedInterface";
import { campaign_Basics } from "../../entities/BaiscsInterface";
import { CampaignDbInterface } from "../repository/campaignDbRepository";
import cloudinary from "cloudinary";

export const campaignUsecase = (
  repository: ReturnType<CampaignDbInterface>
) => {
  const listCampaigns = async () => {
    return await repository.listCampaigns();
  };

  const createBasics = async (basics: campaign_Basics) => {
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

  return {
    listCampaigns,
    createBasics,
    createAdvanced,
    uploadImage,
    videoUpload,
  };
};
