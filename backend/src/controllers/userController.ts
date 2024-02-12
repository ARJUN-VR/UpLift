import { Request, Response, request } from "express";
import { userInterface } from "../entities/User";
import { UserDbMethods } from "../frameworks/database/mongoDb/implementations/userDbMethods";
import { UserDbInterFace } from "../application/repository/userDbrepository";
import { userCases } from "../application/usecases/userCases";
import asyncHandler from "express-async-handler";
import Stripe from "stripe";
import { ChatInterface } from "../entities/Chat";
const stripe = new Stripe('sk_test_51OgAh7SBqBEeU2LVufG4q6TNE6MLKyoN2lcbm3Re8JjjF2sDSRzHMCSXLsBt2K6M1GJxthhi3qk8mLjVo01VmM3y00Nh0SkIcv', {
});





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
    await userCases(dbRepositoryuser).forgotPassword(email, password);
    res.status(200).json({ message: "password changed successfully" });
  });

  //desc Handling otp service
  //route POST /api/user/sendotp
  //access private
  const SendOTP = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
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

  const payment = asyncHandler(async (req: Request, res: Response) => {
    const {title,description,amount} = req.body;

    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: title,
                description: description,
              },
              unit_amount: amount * 100,
            },
            quantity: 1,
          },
        ],
        payment_method_types:["card"],
        customer_email:'user@gmail.com',
  
        billing_address_collection:"required",
        mode: "payment",
        success_url: 'http://localhost:5500/success',
        cancel_url: 'http://localhost:5500/campaign/:65b6ac268d3ba59ed8357deb',
      });
      res.send({ url: session.url });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });

 const pledge = asyncHandler(async(req:Request,res:Response)=>{
  const {id,amount,userEmail} = req.body;


     const data =  await userCases(dbRepositoryuser).pledge(id,amount,userEmail)
    res.status(200).json({data})

 })

 const getChannel = asyncHandler(async(req:Request,res:Response)=>{
  const {userEmail} = req.params
  console.log(userEmail)
  const data = await userCases(dbRepositoryuser).getChannels(userEmail)

  res.status(200).json({data})
 })


 const saveChat = asyncHandler(async(req:Request,res:Response)=>{
  const chat:ChatInterface = req.body;
  console.log(chat,'world')
  const data = await userCases(dbRepositoryuser).saveChat(chat)
  res.status(200).json({data})
 })


 const getChats = asyncHandler(async(req:Request,res:Response)=>{
  const {campaignId} = req.params;
  const data = await userCases(dbRepositoryuser).getChats(campaignId)
  res.status(200).json({data})
 })

 


  return {
    addUser, 
    userSignIn,
    userSignout,
    getProfile,
    editProfile,
    forgotPassword,
    SendOTP,
    verifyOtp,
    payment,
    pledge,
    getChannel,
    saveChat,
    getChats
  };
};
