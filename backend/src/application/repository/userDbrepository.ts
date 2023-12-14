import { userInterface } from "../../entities/User";
import { UserDbMethods } from "../../frameworks/database/mongoDb/implementations/userDbMethods";






export const userDbInterface = (repository:ReturnType<UserDbMethods>) => {
    

    const adduser = async(user:userInterface) => await repository.addUser(user)

    const findById=async(email:string) => await repository.findById(email)


    return {
        adduser,
        findById
    }
}

export type UserDbInterFace = typeof userDbInterface