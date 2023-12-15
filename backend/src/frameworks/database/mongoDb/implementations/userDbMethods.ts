import { userInterface } from "../../../../entities/User";
import { User } from "../model/userSchema";

export const userDbMethods = () => {
  const addUser = async (user: userInterface) => await User.create(user);

  const findByEmail = async (email: string) => {
    const user = await User.findOne({ email: email });
    return user;
  };
  const findById = async(id:string) =>{
    return await User.findOne({_id:id})
  }

  return {
    addUser,
    findByEmail,
    findById
  };
};

export type UserDbMethods = typeof userDbMethods;
