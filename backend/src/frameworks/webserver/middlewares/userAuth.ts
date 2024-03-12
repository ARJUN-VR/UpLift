import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
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

  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const accessToken = req.cookies.accessToken;
      console.log("accesToken:", accessToken);

      const renewToken = async () => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
          console.log("works");
          return res.json({ message: "no refresh token" });
        } else {
          try {
            const decoded: JwtPayload = jwt.verify(
              refreshToken,
              configKeys.REFRESH_KEY
            ) as JwtPayload;

            const userId = decoded.userId;
            console.log(userId, "userId");
            const accessToken = jwt.sign({ userId }, configKeys.ACCESS_KEY, {
              expiresIn: "1m",
            });
            res.cookie("accessToken", accessToken, { maxAge: 600000 });
            next();
          } catch (error) {
            console.log(error);
          }
        }
      };

      if (accessToken) {
        try {
          const decoded: JwtPayload = jwt.verify(
            accessToken,
            configKeys.ACCESS_KEY
          ) as JwtPayload;
          const userdata = await dbRepository.findById(decoded.userId);
          if (userdata?.isBlocked) {
            const error = new Error("Access denied.");
            throw error;
          } else {
            req.user = userdata;
            next();
          }
        } catch (error) {
          next(error);
        }
      } else {
        console.log("here");
        await renewToken();
      }
    }
  );
};
