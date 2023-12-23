import { UserDbInterFace } from "../repository/userDbrepository";
import { userInterface } from "../../entities/User";
import generateToken from "../services/generateJwt";

export const userCases = (repository: ReturnType<UserDbInterFace>) => {
  
  const findByEmail = async (email: string) => await repository.findByEmail(email);

  const addUser = async (user: userInterface) => await repository.adduser(user);

  const userSignIn = async (email: string, password: string, res: any) => {
    const user: userInterface | null = await repository.findByEmail(email);

    if (!user) {
      return { success: false, error: "no user found" };
    }
    if (user && typeof user.matchPassword === "function") {
      if (await user.matchPassword(password)) {
        generateToken(res, user);
        return { success: true, user };
      } else {
        return { success: false, error: "Incorrect password" };
      }
    } else {
      return { success: false, error: "Unable to verify password" };
    }
  };

  const userSignout = (res: any) => {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
  };

  const updateProfile=async(req:any) => {
   return await repository.saveUser(req)
  }

  return {
    findByEmail,
    addUser,
    userSignIn,
    userSignout,
    updateProfile
  };
};
