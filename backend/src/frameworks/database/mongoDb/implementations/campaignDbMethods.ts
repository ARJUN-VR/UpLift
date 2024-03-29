import { campaign_advanced } from "../../../../entities/AdvancedInterface";
import { campaign_Basics } from "../../../../entities/BaiscsInterface";
import { CommentInterface } from "../../../../entities/CommentInterface";
import { RewardInterface } from "../../../../entities/RewardInterface";
import { Advanced } from "../model/campaign/advancedSchema";
import { Basics } from "../model/campaign/basicSchema";
import { Comment } from "../model/campaign/commentSchema";
import { Reward } from "../model/campaign/rewardSchema";
import { ObjectId } from "mongodb";
import { Category } from "../model/categorySchema";
import { Payment } from "../model/paymentSchema";

export const campaignDbMethods = () => {
  const getAllBasics = async () => {
    try {

        return await Basics.find({$and:[{isVerified:true},{isListed:true}]});
 
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
    return await Basics.find({$and:[{ category: category },{isVerified:true},{isListed:true}]});
      
    } catch (error) {
      console.log(error)
    }
  };

  const addComment = async(commentData:CommentInterface)=>{
    try {

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

  const getReward = async(id:string)=>{
    try{
      return await Reward.findOne({basicId:id})
    }catch(error){
      console.error(error)
      throw Error
    }
  }

  const getNotificationCount = async()=>{
    try{
      return await Basics.find({isVerified:false},{new:true}).countDocuments()
  }catch(error){
    console.log(error)
  }
  }

  const listCategory = async()=>{
    try{
      return await Category.find()
    }catch(error){
      console.log(error)
    }

  }


  const getDashboardData = async(creatorEmail:string)=>{
    try{
      return await Basics.aggregate([
        {$match:{
          "creator":creatorEmail
        }},
        {$project:{
          'currentAmount':1,
          'target':1,
          'backers':1
  
        }}
      ])
    }catch(error){
      console.log(error)
    }
   
  }

  const getPaymentData = async(campaignId:string)=>{
    return await Payment.find({campaignId})
  }

  const search = async(query:string)=>{
    return await Basics.find({
      $or:[
        {title: {$regex:query,$options:'i'}},
        {tagline:{$regex:query,$options:'i'}}
      ]
    })
  }


  const HandleLIve = async (campaignId: string) => {
    try {
      const data = await Basics.findOne(
        { _id: campaignId }
      );
      if(data){
        data.isLive = !data?.isLive
        await data.save()
        return data
      }else{
        return {success:false}
      }
    } catch (error) {
      console.error("Error:", error);
      throw error; 
    }
  };


  return {
    getAllBasics,
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

export type CampaignDbMethods = typeof campaignDbMethods;
