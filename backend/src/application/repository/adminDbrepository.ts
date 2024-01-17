import { AdminDbMethods } from "../../frameworks/database/mongoDb/implementations/adminDbMethods";



export const adminDbInterface = (repository:ReturnType<AdminDbMethods>) =>{

   const findByEmail=async(email:string)=>{
    return await repository.findByEmail(email)
   }

   const getUsers = async()=>{
      return await repository.getUsers()
   }

   const blockUser = async(email:string | undefined)=>{
      return await repository.blockUser(email)
   }

   const findCampaignById = async(id:string | undefined)=>{
      return await repository.findCampaignById(id)
   }

   const verifyCampaign = async(id:string)=>{
      return await repository.verfyCampaign(id)
   }

   const listCampaignRequests = async()=>{
      return await repository.listCampaignRequests()
   }

   const listLiveCampaigns = async()=>{
      return await repository.listLiveCampaigns()
   }

   const findAdvanced = async(id:string | undefined)=>{
      return await repository.findAdvanced(id)
   }

   const completeCampaignData = async(id:string)=>{
      return await repository.completeCampaignData(id)
   }

   return{
    findByEmail,
    getUsers,
    blockUser,
    findCampaignById,
    verifyCampaign,
    listCampaignRequests,
    listLiveCampaigns,
    findAdvanced,
    completeCampaignData
   }
}

export type AdminDbRepository = typeof adminDbInterface