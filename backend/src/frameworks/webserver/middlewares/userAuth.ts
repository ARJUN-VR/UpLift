import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Request, Response,NextFunction} from "express";
import { configKeys } from "../../database/mongoDb/config";
import { UserDbInterFace } from "../../../application/repository/userDbrepository";
import { UserDbMethods } from "../../database/mongoDb/implementations/userDbMethods";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | null | any; 
    }
  }
}


export const protect = (
  userDbInterface: UserDbInterFace,
  dbImplements: UserDbMethods
) => {

  const dbRepository = userDbInterface(dbImplements());

  return asyncHandler(async (req: Request, res: Response,next:NextFunction) => {


    const token = req.cookies.jwt;
console.log(token,'token')

    if (token) {
      try{
        console.log('inside the token')
        const decoded: JwtPayload = jwt.verify(
          token,
          configKeys.JWT_KEY
        ) as JwtPayload;
        const userdata = await dbRepository.findById(decoded.userId);

        if(userdata?.isBlocked){
          const error = new Error('Access denied.')
          console.log('blockedddd')
          throw error
        }else{
          req.user=userdata
          console.log('nooooo')
          next()
        }
        
      }catch(error){
        next(error)
 
      }
    
    }else{
      throw new Error('Not authorized,no Token')
    }
  });
};
