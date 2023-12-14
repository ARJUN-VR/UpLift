import { UserDbInterFace } from "../repository/userDbrepository";
import { userInterface } from "../../entities/User";


export const userCases =(repository:ReturnType<UserDbInterFace>)=>{


    const addUser = async(user:userInterface) => await repository.adduser(user);
    
    const findById = async(email:string) => await repository.findById(email)





    return {
        addUser,
        findById
    }
}