import { Admin } from "../model/adminSchema";
import { User } from "../model/userSchema";


export const adminDbMethods =()=>{
    const findByEmail = async(email:string)=>{
        return await Admin.findOne({email:email})
    }

    const getUsers = async()=>{
        return  await User.find().select('-password')
        
    }

    const blockUser = async(email:string | undefined)=>{
        console.log(email)
       const user = await User.findOne({email:email})
       console.log(user)
       
       if(!user){
        return {success:false}
       }else{
        
        user.isBlocked = !user.isBlocked
       return  await user.save()
       }
      
    }

    return {
        findByEmail,
        getUsers,
        blockUser
    }
}

export type AdminDbMethods = typeof adminDbMethods