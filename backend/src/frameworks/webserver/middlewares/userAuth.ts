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
    console.log('token: ',token)

    if (token) {
      try{
        const decoded: JwtPayload = jwt.verify(
          token,
          configKeys.JWT_KEY
        ) as JwtPayload;
        const userdata = await dbRepository.findById(decoded.userId);
        req.user=userdata
        next()
      }catch(error){
        console.log(error,'error during validation')
      }
    
    }else{
      throw new Error('Not authorized,no Token')
    }
  });
};
