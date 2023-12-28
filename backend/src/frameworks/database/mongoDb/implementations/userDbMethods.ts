import { userInterface } from "../../../../entities/User";
import { User } from "../model/userSchema";
import { Document } from "mongoose";

export const userDbMethods = () => {
  const addUser = async (user: userInterface) => {
    return await User.create(user);
  };

  const findByEmail = async (email: string) => {
    const user = await User.findOne({ email: email });
    return user;
  };

  
  const findById = async (id: string) => {
    return await User.findOne({ _id: id });
  };



  const saveUser = async (req: any) => {
    const user = await User.findById({ _id: req.user._id });
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;

      return await user.save();
    }
  };

  const forgotPassword = async (email: string, password: string) => {
    const user: userInterface | null = await User.findOne({ email: email });
    if (!user) {
      return { success: false, error: "user not found" };
    } else {
      const userDoc = user as Document & userInterface;

      userDoc.password = password;
      await userDoc.save();
      return { success: true, message: "passowrd changed succesfully" };
    }
  };


  return {
    addUser,
    findByEmail,
    findById,
    saveUser,
    forgotPassword,
  };
};

export type UserDbMethods = typeof userDbMethods;
