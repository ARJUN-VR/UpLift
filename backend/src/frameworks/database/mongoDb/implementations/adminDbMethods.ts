import { Admin } from "../model/adminSchema";
import { Advanced } from "../model/campaign/advancedSchema";
import { Basics } from "../model/campaign/basicSchema";
import { Category } from "../model/categorySchema";
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
    const findCampaignById = async(id:string | undefined)=>{
        return Basics.find({_id:id})
      }

  const findAdvanced = async(id:string | undefined)=>{
    return Advanced.find({basicId:id})
  }
      const verfyCampaign = async(id:string)=>{
        return  await Basics.updateOne({ _id: id }, { $set: { isVerified: true } });
        
        
      }
      const listCampaignRequests = async()=>{
        return Basics.find({isVerified:false})
      }

      const listLiveCampaigns = async()=>{
        return Basics.find({isVerified:true})
      }

      const addCategory = async(name:string)=>{
        return Category.create({name})
      }

    return {
        findByEmail,
        getUsers,
        blockUser,
        findCampaignById,
        verfyCampaign,
        listCampaignRequests,
        listLiveCampaigns,
        findAdvanced,
        addCategory
    }
}

export type AdminDbMethods = typeof adminDbMethods