import { Request, Response } from "express";
import { userInterface } from "../entities/User";
import { UserDbMethods } from "../frameworks/database/mongoDb/implementations/userDbMethods";
import { UserDbInterFace } from "../application/repository/userDbrepository";
import { userCases } from "../application/usecases/userCases";

export const userController = (
  dbInterface: UserDbInterFace,
  dbImplements: UserDbMethods
) => {
  const dbRepositoryuser = dbInterface(dbImplements());

  const addUser = async (req: Request, res: Response) => {
    try {
      const user: userInterface = req.body;
      await userCases(dbRepositoryuser).addUser(user);

      res.status(201).json({ message: "user added successfully" });
    } catch (error) {
      console.log(error);
    }
  };

  const userSignIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const result = await userCases(dbRepositoryuser).userSignIn(
        email,
        password
      );
      if (result.success) {
        res.status(200).json({ message: "user signed in successfully" });
      } else if (result.error === "Incorrect password") {
        res.status(401).json({ message: "Incorrect password" });
      } else if (result.error === "no user found") {
        res.status(404).json({ message: "user not found" });
      } else {
        res.status(400).json({ message: "authentication failed" });
      }
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  };

  return {
    addUser,
    userSignIn,
  };
};
