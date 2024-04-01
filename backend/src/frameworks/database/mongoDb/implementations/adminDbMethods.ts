import { Admin } from "../model/adminSchema";
import { Advanced } from "../model/campaign/advancedSchema";
import { Basics } from "../model/campaign/basicSchema";
import { Category } from "../model/categorySchema";
import { Payment } from "../model/paymentSchema";
import { User } from "../model/userSchema";


export const adminDbMethods =()=>{
  const findByEmail = async (email: string) => {
    try {
      return await Admin.findOne({ email: email });
    } catch (error) {
      console.error("Error finding admin by email:", error);
      throw new Error("Error finding admin by email");
    }
  };
  
  const getUsers = async () => {
    try {
      return await User.find().select('-password');
    } catch (error) {
      console.error("Error getting users:", error);
      throw new Error("Error getting users");
    }
  };
  
  const blockUser = async (email: string | undefined) => {
    try {
      const user = await User.findOne({ email: email });
  
      if (!user) {
        return { success: false };
      } else {
        user.isBlocked = !user.isBlocked;
        return await user.save();
      }
    } catch (error) {
      console.error("Error blocking user:", error);
      throw new Error("Error blocking user");
    }
  };
  
  const findCampaignById = async (id: string | undefined) => {
    try {
      return await Basics.find({ _id: id });
    } catch (error) {
      console.error("Error finding campaign by ID:", error);
      throw new Error("Error finding campaign by ID");
    }
  };
  
  const findAdvanced = async (id: string | undefined) => {
    try {
      return await Advanced.find({ basicId: id });
    } catch (error) {
      console.error("Error finding advanced by ID:", error);
      throw new Error("Error finding advanced by ID");
    }
  };
  
  const verfyCampaign = async (id: string) => {
    try {
      return await Basics.updateOne({ _id: id }, { $set: { isVerified: true } });
    } catch (error) {
      console.error("Error verifying campaign:", error);
      throw new Error("Error verifying campaign");
    }
  };
  
  const listCampaignRequests = async () => {
    try {
      return await Basics.find({ isVerified: false });
    } catch (error) {
      console.error("Error listing campaign requests:", error);
      throw new Error("Error listing campaign requests");
    }
  };
  
  const listLiveCampaigns = async () => {
    try {
      return await Basics.find({ isVerified: true });
    } catch (error) {
      console.error("Error listing live campaigns:", error);
      throw new Error("Error listing live campaigns");
    }
  };
  
  const addCategory = async (name: string) => {
    try {
      const isExist = await Category.find({ name });
  
      if (isExist && isExist.length > 0) {
        throw new Error('category already exist');
      } else {
        return await Category.create({ name });
      }
    } catch (error) {
      console.error("Error adding category:", error);
      throw new Error("Error adding category");
    }
  };
  
  const listCategory = async (name: string) => {
    try {
      await Basics.updateMany({ category: name }, { $set: { isListed: true } }, { new: true });
      const detail = await Category.findOne({ name: name });
  
      if (detail) {
        detail.isBlocked = !detail.isBlocked;
        await detail.save();
      } else {
        return { success: false };
      }
  
      return Basics.find({ category: name });
    } catch (error) {
      console.error("Error listing category:", error);
      throw new Error("Error listing category");
    }
  };
  
  const unListCategory = async (name: string) => {
    try {
      await Basics.updateMany({ category: name }, { $set: { isListed: false } }, { new: true });
      const detail = await Category.findOne({ name: name });
  
      if (detail) {
        detail.isBlocked = !detail.isBlocked;
        await detail.save();
      } else {
        return { success: false };
      }
  
      return Basics.find({ category: name });
    } catch (error) {
      console.error("Error unlisting category:", error);
      throw new Error("Error unlisting category");
    }
  };
  

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
      }catch(error:any){
        console.log(error)
        const msg = error.codeName 
        throw new Error(msg)
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
  
         
          const result = data.map(item => ["Category: " + item._id, item.count]);
  

          result.unshift(["Category", "Count"]);
  
          return result;
      } catch (error) {
          console.log(error);
          return [];
      }
  };

 
  const lineChart = async () => {
    try {
      const monthlyUserRegistrations = await User.aggregate([
        {
          $project: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" } 
          }
        },
        {
          $group: {
            _id: { month: "$month", year: "$year" },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 } // Optionally, sort by year and month
        }
      ]);
  
      console.log(monthlyUserRegistrations);
      return monthlyUserRegistrations;
    } catch (error) {
      console.error("Error fetching monthly user registrations:", error);
      throw error;
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
        pieChartData,
        lineChart
    }
}

export type AdminDbMethods = typeof adminDbMethods