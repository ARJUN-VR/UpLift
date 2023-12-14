import { Request,Response } from "express"
import { userInterface } from "../entities/User"
import { UserDbMethods } from "../frameworks/database/mongoDb/implementations/userDbMethods"
import { UserDbInterFace } from "../application/repository/userDbrepository"
import { userCases } from "../application/usecases/userCases"






export const userController= (
    dbInterface:UserDbInterFace,
    dbImplements:UserDbMethods
    ) => {

    const dbRepositoryuser=dbInterface(dbImplements()) 


    const addUser = async(req:Request,res:Response) => {
        const user:userInterface = req.body
       await userCases(dbRepositoryuser).addUser(user)

       res.status(201).json({message:'user added successfully'})

    }
    

    const userSignIn=async(req:Request,res:Response) => {
        const {email,password} = req.body
    }

   


    return {
        addUser
    }
}