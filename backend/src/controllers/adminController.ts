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
    const user = await adminCases(dbRepsitoryAdmn).blockUser(email);
    res
      .status(200)
      .json({ message: "user blocked/unblocked successfully", user });
  });

  const findCampaignById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.query.id as string;

    const basicData = await adminCases(dbRepsitoryAdmn).findCampaignById(id);
    const advancedData = await adminCases(dbRepsitoryAdmn).findAdvanced(id);

    res.status(200).json({ message: "success", basicData, advancedData });
  });

  const verifyCampaign = asyncHandler(async (req: Request, res: Response) => {
    const id = req.body.id;
    const data = await adminCases(dbRepsitoryAdmn).verifyCampaign(id);
    res.status(200).json({ message: "verified", data });
  });

  const listCampaignRequests = asyncHandler(
    async (req: Request, res: Response) => {
      const list = await adminCases(dbRepsitoryAdmn).listCampaignRequests();
      res.status(200).json({ list });
    }
  );

  const listLiveCampaigns = asyncHandler(
    async (req: Request, res: Response) => {
      const campaigns = await adminCases(dbRepsitoryAdmn).listLiveCampaigns();
      res.status(200).json({ campaigns });
    }
  );

  const addCategory = asyncHandler(async (req: Request, res: Response) => {
    const { name } = req.body;
    const result = await adminCases(dbRepsitoryAdmn).addCategory(name);
    res.status(200).json({ message: "category created", result });
  });

  const categoryAction = asyncHandler(async (req: Request, res: Response) => {
    const { name } = req.body;
    console.log(name)
    const catData = await adminCases(dbRepsitoryAdmn).handleCategoryAction(name);
    console.log(catData,'from controller')
    res.status(200).json({ message: "action did", catData });
  });


  const editCategory = asyncHandler(async(req:Request,res:Response)=>{
    const {newName,categoryId} = req.body;
    const data = await adminCases(dbRepsitoryAdmn).editCategory(categoryId,newName)
    res.status(200).json({message:'edit success',data})
  })

  const getDashboardCounts = asyncHandler(async(req:Request,res:Response)=>{
    const data = await adminCases(dbRepsitoryAdmn).dashboardCounts()
    
    res.status(200).json({data})
  })

  const getPaymentBarData = asyncHandler(async(req:Request,res:Response)=>{
    const data = await adminCases(dbRepsitoryAdmn).paymentBarData()
    res.status(200).json({data})
  })

  const getPieChartData = asyncHandler(async(req:Request,res:Response)=>{
    const data = await adminCases(dbRepsitoryAdmn).pieChartData()
    res.status(200).json({data})
  })


  

  return {
    adminSignin,
    logout,
    getUsers,
    blockUser,
    findCampaignById,
    verifyCampaign,
    listCampaignRequests,
    listLiveCampaigns,
    addCategory,
    categoryAction,
    editCategory,
    getDashboardCounts,
    getPaymentBarData,
    getPieChartData
  };
};
