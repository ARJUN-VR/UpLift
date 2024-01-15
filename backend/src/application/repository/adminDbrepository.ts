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

   const findCampaignById = async(id:string)=>{
      return await repository.findCampaignById(id)
   }

   const verifyCampaign = async(id:string)=>{
      return await repository.verfyCampaign(id)
   }

   const listCampaigns = async()=>{
      return await repository.listCampaigns()
   }

   return{
    findByEmail,
    getUsers,
    blockUser,
    findCampaignById,
    verifyCampaign,
    listCampaigns
   }
}

export type AdminDbRepository = typeof adminDbInterface