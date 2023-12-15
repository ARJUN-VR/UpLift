import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { configKeys } from "../../database/mongoDb/config";
import { UserDbInterFace } from "../../../application/repository/userDbrepository";
import { UserDbMethods } from "../../database/mongoDb/implementations/userDbMethods";

export const protect = (
  userDbInterface: UserDbInterFace,
  dbImplements: UserDbMethods
) => {
  const dbRepository = userDbInterface(dbImplements());

  return asyncHandler(async (req: Request, res: Response) => {
    const token = req.cookies.jwt;

    if (token) {
      const decoded: JwtPayload = jwt.verify(
        token,
        configKeys.JWT_KEY
      ) as JwtPayload;
      const userdata = await dbRepository.findById(decoded.userId);
    }
  });
};
