import { AdminDbRepository } from "../application/repository/adminDbrepository";
import { AdminDbMethods } from "../frameworks/database/mongoDb/implementations/adminDbMethods";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { adminCases } from "../application/usecases/adminCases";

export const adminController = (
  dbInterface: AdminDbRepository,
  dbImplements: AdminDbMethods
) => {
  const dbRepsitoryAdmn = dbInterface(dbImplements());

  //desc     admin login
  //route    POST /api/admin/login
  //access   public
  const adminSignin = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log("data");
    console.log(email);
    console.log(password);
    const result = await adminCases(dbRepsitoryAdmn).adminSignin(
      email,
      password,
      res
    );
    if (result.success) {
      res.status(200).json({ message: "admin signedIn successfully", result });
    } else if (result.error === "Incorrect password") {
      res.status(401).json({ message: "Incorrect password" });
    } else if (result.error === "cannot find admin") {
      res.status(404).json({ message: "admin not found" });
    } else {
      res.status(404).json({ message: "something went wrong" });
    }
  });

  //desc   admin Signout
  //route  POST /api/admin/logout
  //access public
  const logout = asyncHandler(async (req: Request, res: Response) => {
    adminCases(dbRepsitoryAdmn).logout(res);
    res.status(200).json({ message: "user signed out successfully" });
  });

  ///desc fetch users
  //route GET /api/admin/getusers
  //access private
  const getUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await adminCases(dbRepsitoryAdmn).getUsers();

    res.status(200).json({ message: "users fetched successfully", users });
  });

  const blockUser = asyncHandler(async (req: Request, res: Response) => {
    const email: string = req.query.email as string;
    await adminCases(dbRepsitoryAdmn).blockUser(email);
    res.status(200).json({ message: "user blocked/unblocked successfully" });
  });

  return {
    adminSignin,
    logout,
    getUsers,
    blockUser,
  };
};
