import { Request, Response } from "express";
import { userInterface } from "../entities/User";
import { UserDbMethods } from "../frameworks/database/mongoDb/implementations/userDbMethods";
import { UserDbInterFace } from "../application/repository/userDbrepository";
import { userCases } from "../application/usecases/userCases";
import asyncHandler from "express-async-handler";
import { campaign_Basics } from "../entities/BaiscsInterface";
import { campaign_advanced } from "../entities/AdvancedInterface";

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
    } else if (result.error === "user blocked") {
      res.status(403).json({ message: "Access denied." });
    } else {
      res.status(400).json({ message: "authentication failed" });
    }
  });

  //desc   user Signout
  //route  POST /api/user/signout
  //access public
  const userSignout = asyncHandler(async (req, res: Response) => {
    userCases(dbRepositoryuser).userSignout(res);
    res.status(200).json({ message: "user signedOut successfully" });
  });

  //desc getUserProfile
  //route GET /api/user/profile
  //access private
  const getProfile = asyncHandler(async (req: Request, res: Response) => {
    const email = req.user.email;
    const userdata = await userCases(dbRepositoryuser).findByEmail(email);
    res
      .status(200)
      .json({ message: "fetched user profile successully", userdata });
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
    console.log(email, password, "email apsweorj");
    await userCases(dbRepositoryuser).forgotPassword(email, password);
    res.status(200).json({ message: "password changed successfully" });
  });

  //desc Handling otp service
  //route POST /api/user/sendotp
  //access private
  const SendOTP = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    console.log(email);
    console.log("getting call..");
    const otpResponse = await userCases(dbRepositoryuser).verifyUserAndSendOtp(
      email
    );
    res.status(200).json(otpResponse);
  });

  //desc otp verification
  //route POST /api/user/verify-otp
  //access public
  const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
    const { email, newOtp } = req.body;
    const otpRes = await userCases(dbRepositoryuser).verifyOtp(email, newOtp);
    console.log(otpRes);
    res.status(200).json({ message: otpRes?.message });
  });

  //desc getting basics for the homepage
  //route POST /api/user/get-campaigns
  //access public
  const listCampaigns = asyncHandler(async (req: Request, res: Response) => {
    const list = await userCases(dbRepositoryuser).listCampaigns();
    res.status(200).json({ list });
  });

  //desc campaign basic details
  //route POST /api/user/create_basics
  //access private
  const createBasics = asyncHandler(async (req: Request, res: Response) => {
    const basicData: campaign_Basics = req.body;
    const imgRes = await userCases(dbRepositoryuser).uploadImage(
      basicData.image
    );
    if (imgRes) {
      basicData.image = imgRes.secure_url;
    }
    const data = await userCases(dbRepositoryuser).createBasics(basicData);
    res.status(200).json({ message: "created successfully", data });
  });

  //desc campaign advanced details
  //route POST /api/user/create_advanced
  //access private
  const createAdvanced = asyncHandler(async (req: Request, res: Response) => {
    const advancedData: campaign_advanced = req.body;
    const imgRes = await userCases(dbRepositoryuser).uploadImage(
      advancedData?.thumbnail
    );
    const videoRes = await userCases(dbRepositoryuser).videoUpload(
      advancedData?.video
    );
    if (imgRes) {
      advancedData.thumbnail = imgRes.secure_url;
    }
    if (videoRes) {
      advancedData.video = videoRes.secure_url;
    }
    const data = await userCases(dbRepositoryuser).createAdvanced(advancedData);
    res.status(200).json({ message: "success", data });
  });

  return {
    addUser,
    userSignIn,
    userSignout,
    getProfile,
    editProfile,
    forgotPassword,
    SendOTP,
    verifyOtp,
    listCampaigns,
    createBasics,
    createAdvanced
  };
};
