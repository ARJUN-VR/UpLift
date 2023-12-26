import { AdminDbMethods } from "../../frameworks/database/mongoDb/implementations/adminDbMethods";
import { Admin } from "../../frameworks/database/mongoDb/model/adminSchema";


export const adminDbInterface = (repository:ReturnType<AdminDbMethods>) =>{
   const findByEmail=async(email:string)=>{
    return await Admin.findOne({email:email})
   }

   return{
    findByEmail
   }
}

export type AdminDbRepository = typeof adminDbInterface