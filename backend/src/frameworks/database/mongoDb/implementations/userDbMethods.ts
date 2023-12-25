import { userInterface } from "../../../../entities/User";
import { User } from "../model/userSchema";

export const userDbMethods = () => {
  const addUser = async (user: userInterface) => { return await User.create(user)};

  const findByEmail = async (email: string) => {
    const user = await User.findOne({ email: email });
    return user;
  };
  const findById = async(id:string) =>{
    return await User.findOne({_id:id})
  }
  const saveUser = async(req:any) =>{

    const user = await  User.findById({_id:req.user._id})
    if(user){
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.password = req.body.password || user.password

     return  await user.save()

    }
    
  


   
  }

  return {
    addUser,
    findByEmail,
    findById,
    saveUser
  };
};

export type UserDbMethods = typeof userDbMethods;
