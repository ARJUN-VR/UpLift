import { Admin } from "../model/adminSchema";
import { Advanced } from "../model/campaign/advancedSchema";
import { Basics } from "../model/campaign/basicSchema";
import { Category } from "../model/categorySchema";
import { Payment } from "../model/paymentSchema";
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
        return await Basics.find({_id:id})
      }

  const findAdvanced = async(id:string | undefined)=>{
    return await Advanced.find({basicId:id})
  }
      const verfyCampaign = async(id:string)=>{
        return  await Basics.updateOne({ _id: id }, { $set: { isVerified: true } });
        
        
      }
      const listCampaignRequests = async()=>{
        return await Basics.find({isVerified:false})
      }

      const listLiveCampaigns = async()=>{
        return await Basics.find({isVerified:true})
      }

      const addCategory = async(name:string)=>{
       const isExist = await Category.find({name})

       if(isExist){
        throw new Error('category already exist')
       }else{
        return await Category.create({name})
        
       }
      }

     const listCategory=async(name:string)=>{
       await Basics.updateMany({category:name},{$set:{isListed:true}},{new:true})
       const detail = await Category.findOne({name:name})
       if(detail){
        detail.isBlocked = !detail.isBlocked
        await detail.save()
       }else{
        return {success:false}
       }
       
      return Basics.find({category:name})
     }

     const unListCategory=async(name:string)=>{
       await Basics.updateMany({category:name},{$set:{isListed:false}},{new:true})
       const detail = await Category.findOne({name:name})
       if(detail){
        detail.isBlocked = !detail.isBlocked
        await detail.save()
       }else{
        return {success:false}
       }
       return Basics.find({category:name})
     }

     const checkListStatus = async(name:string)=>{
      try {
        const campData = await Basics.find({category:name})
      return campData[0].isListed
      } catch (error) {
        console.log(error)
      }
      
     }

     const editCategory = async(categoryId:string,newName:string)=>{
      try{
          return await Category.findOneAndUpdate({_id:categoryId},{$set:{name:newName}},{new:true})
      }catch(error){
        console.log(error)
        throw new Error('something went wrong')
      }
     }


     const dashboardCounts = async()=>{
      try{

       const aggregatedData = await Basics.aggregate([
        {
          $match:{
            isVerified:true,
            isListed:true
          }
        },
        {
          $group:{
            _id:null,
            liveCampaignCount:{$sum:1},
            totalBackers:{$sum:"$backers"},
            totalAmount:{$sum:"$currentAmount"}
          }
        }
       ])

       return {
        campaignCount:aggregatedData[0]?.liveCampaignCount || 0,
        backers:aggregatedData[0]?.totalBackers || 0,
        Amount:aggregatedData[0]?.totalAmount || 0
       }

      }catch(error){
        console.log(error)
      }
     }

     const paymentBarData = async()=>{
     return  await Payment.aggregate([
        {
          $project:{
            _id:0,
            payment:1,
            isCreatedAt:1
          }
        }
      ])
     }

     const pieChartData = async () => {
      try {
          const data = await Basics.aggregate([
              {
                  $group: {
                      _id: "$category",
                      count: { $sum: 1 }
                  }
              }
          ]);
  
          // Transforming data into array of arrays with a fixed value for the first column
          const result = data.map(item => ["Category: " + item._id, item.count]);
  
          // Adding a fixed value for the first column in the first array
          result.unshift(["Category", "Count"]);
  
          return result;
      } catch (error) {
          console.log(error);
          return [];
      }
  };

    return {
        findByEmail,
        getUsers,
        blockUser,
        findCampaignById,
        verfyCampaign,
        listCampaignRequests,
        listLiveCampaigns,
        findAdvanced,
        addCategory,
        listCategory,
        unListCategory,
        checkListStatus,
        editCategory,
        dashboardCounts,
        paymentBarData,
        pieChartData
    }
}

export type AdminDbMethods = typeof adminDbMethods