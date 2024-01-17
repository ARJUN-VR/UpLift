import { Admin } from "../model/adminSchema";
import { Advanced } from "../model/campaign/advancedSchema";
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

      const completeCampaignData = async(id:string)=>{
        const result = await Basics.aggregate([
          {
            $match: { _id: id } // Match the document with the specified _id
          },
          {
            $lookup: {
              from: 'Advanced', // The collection to perform the lookup on
              localField: '_id', // The field from the input documents (basics collection)
              foreignField: 'basicId', // The field from the documents in the "advanced" collection
              as: 'advancedData' // The name of the new array field to store the matched data
            }
          },
          {
            $unwind: '$advancedData' // Unwind the array field to get a single document
          }
          
        ])
        console.log(result,'result')
    
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
        completeCampaignData
    }
}

export type AdminDbMethods = typeof adminDbMethods