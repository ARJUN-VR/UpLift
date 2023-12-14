import { userInterface } from "../../../../entities/User";
import { User } from "../model/userSchema";


export const userDbMethods = () => {


    const addUser = async(user:userInterface) => await User.create(user)
    const findById = async(email:string) =>  await User.findById(email)
   

    
    return {
        addUser,
        findById
    }
}

export type UserDbMethods = typeof userDbMethods