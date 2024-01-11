import { NextFunction,Response,Request } from "express";


const handleError =(err:Error,req:Request,res:Response,next:NextFunction)=>{
    res.status(403).json({message:err.message})
}

export default handleError