import { Request, Response } from "express";
import { userInterface } from "../entities/User";
import { UserDbMethods } from "../frameworks/database/mongoDb/implementations/userDbMethods";
import { UserDbInterFace } from "../application/repository/userDbrepository";
import { userCases } from "../application/usecases/userCases";
import asyncHandler from "express-async-handler";

export const userController = (
  dbInterface: UserDbInterFace,
  dbImplements: UserDbMethods
) => {
  const dbRepositoryuser = dbInterface(dbImplements());

  //@desc    user register
  //route    POST /api/user/register
  //access   public
  const addUser = asyncHandler(async (req: Request, res: Response) => {
    const user: userInterface = req.body;
    const userData: userInterface | {} = await userCases(
      dbRepositoryuser
    ).addUser(user);
    if (userData == false) {
      res.status(401).json({ message: "user already exist" });
    } else {
      res.status(201).json({ message: "user added successfully", userData });
    }
  });

  //desc     user login
  //route    POST /api/user
  //access   public
  const userSignIn = asyncHandler(async (req: Request, res: Response) => {
    const { email, pass } = req.body;
    const result = await userCases(dbRepositoryuser).userSignIn(
      email,
      pass,
      res
    );
    if (result.success) {
      res.status(200).json({ message: "user signed in successfully", result });
    } else if (result.error === "Incorrect password") {
      res.status(401).json({ message: "Incorrect password" });
    } else if (result.error === "no user found") {
      res.status(404).json({ message: "user not found" });
    } else {
      res.status(400).json({ message: "authentication failed" });
    }
  });
   
  //desc   user Signout
  //route  POST /api/user/signout
  //access public
  const userSignout = asyncHandler(async (req: Request, res: Response) => {
    userCases(dbRepositoryuser).userSignout(res);
    res.status(200).json({ message: "user signedOut successfully" });
  });

  //desc getUserProfile
  //route GET /api/user/profile
  //access private
  const getProfile = asyncHandler(async (req: Request, res: Response) => {
    const email = req.user.email;
    const userdata = await userCases(dbRepositoryuser).findByEmail(email);
    res.status(200).json({ message: "fetched user profile successully", userdata });
  });

  //desc edit UserProfile
  //route PATCH /api/user/profile
  //access private
  const editProfile = asyncHandler(async (req: Request, res: Response) => {
    const updateduser = await userCases(dbRepositoryuser).updateProfile(req);
    res.status(200).json({ message: "profile updated successfully" });
  });

  //desc forgot password
  //route PATCH /api/user/forgotpassword
  //access public

  const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    await userCases(dbRepositoryuser).forgotPassword(email, password);
    res.status(200).json({ message: "password changed successfully" });
  });


  return {
    addUser,
    userSignIn,
    userSignout,
    getProfile,
    editProfile,
    forgotPassword,
  };
};
