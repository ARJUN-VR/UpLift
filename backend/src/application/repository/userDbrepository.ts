import { userInterface } from "../../entities/User";
import { UserDbMethods } from "../../frameworks/database/mongoDb/implementations/userDbMethods";

export const userDbInterface = (repository: ReturnType<UserDbMethods>) => {
  const adduser = async (user: userInterface) => await repository.addUser(user);

  const findByEmail = async (email: string) => {
    const user = await repository.findByEmail(email);
    return user;
  };

  return {
    adduser,
    findByEmail,
  };
};

export type UserDbInterFace = typeof userDbInterface;
