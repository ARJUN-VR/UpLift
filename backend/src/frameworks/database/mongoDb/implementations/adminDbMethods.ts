import { Admin } from "../model/adminSchema";
import { Basics } from "../model/campaign/basicSchema";
import { User } from "../model/userSchema";


export const adminDbMethods =()=>{
    const findByEmail = async(email:string)=>{
        return await Admin.findOne({email:email})
    }

    const getUsers = async()=>{
       return await User.find().select('-password')
     
    }

    const blockUser = async(email:string | undefined)=>{
       const user = await User.findOne({email:email})
       
       if(!user){
        return {success:false}
       }else{
        
        user.isBlocked = !user.isBlocked
       return  await user.save()
       }
      
    }
    const findCampaignById = async(id:string)=>{
        return Basics.find({_id:id})
      }

      const verfyCampaign = async(id:string)=>{
        return  await Basics.updateOne({ _id: id }, { $set: { isVerified: true } });
        
        
      }
      const listCampaigns = async()=>{
        return Basics.find()
      }

    return {
        findByEmail,
        getUsers,
        blockUser,
        findCampaignById,
        verfyCampaign,
        listCampaigns
    }
}

export type AdminDbMethods = typeof adminDbMethods