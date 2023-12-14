import { UserDbInterFace } from "../repository/userDbrepository";
import { userInterface } from "../../entities/User";

export const userCases = (repository: ReturnType<UserDbInterFace>) => {
  const addUser = async (user: userInterface) => await repository.adduser(user);

  const userSignIn = async (email: string, password: string) => {
    const user: userInterface | null = await repository.findByEmail(email);

    if (!user) {
      return { success: false, error: "no user found" };
    }
    if (user && typeof user.matchPassword === "function") {
      if (await user.matchPassword(password)) {
        return { success: true, user };
      } else {
        return { success: false, error: "Incorrect password" };
      }
    } else {
      return { success: false, error: "Unable to verify password" };
    }
  };

  return {
    addUser,
    userSignIn,
  };
};
