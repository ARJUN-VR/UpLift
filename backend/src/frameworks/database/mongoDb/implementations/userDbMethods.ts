import { userInterface } from "../../../../entities/User";
import { User } from "../model/userSchema";

export const userDbMethods = () => {
  const addUser = async (user: userInterface) => await User.create(user);

  const findByEmail = async (email: string) => {
    const user = await User.findOne({ email: email });
    return user;
  };

  return {
    addUser,
    findByEmail,
  };
};

export type UserDbMethods = typeof userDbMethods;
