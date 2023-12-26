import { Admin } from "../model/adminSchema";


export const adminDbMethods =()=>{
    const findByEmail = async(email:string)=>{
        return await Admin.findOne({email:email})
    }

    return {
        findByEmail
    }
}

export type AdminDbMethods = typeof adminDbMethods