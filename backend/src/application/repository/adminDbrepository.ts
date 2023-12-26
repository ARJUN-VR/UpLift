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

   return{
    findByEmail,
    getUsers,
    blockUser
   }
}

export type AdminDbRepository = typeof adminDbInterface