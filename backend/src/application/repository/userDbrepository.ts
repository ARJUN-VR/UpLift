import { userInterface } from "../../entities/User";
import { UserDbMethods } from "../../frameworks/database/mongoDb/implementations/userDbMethods";

export const userDbInterface = (repository: ReturnType<UserDbMethods>) => {

  const adduser = async (user: userInterface) => await repository.addUser(user);

  const findByEmail = async (email: string) => {
    const user = await repository.findByEmail(email);
    return user;
  };
  const findById = async(id:string) =>{
    return await repository.findById(id)
  }
  const saveUser = async(req:any) =>{
  return  await repository.saveUser(req)
  }

  return {
    adduser,
    findByEmail,
    findById,
    saveUser
  };
};

export type UserDbInterFace = typeof userDbInterface;
