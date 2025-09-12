import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { sendResponse } from "../../../utils/sendResponse";

import Payment from "../payment/payment.model";
import catchAsync from "../../../utils/catchAsync";

// Registration
export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await UserServices.registerUserIntoDB(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User registered successfully",
      data: {
        userId: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message || "User registration failed",
      data: null,
    });
  }
};




// Verify user (admin or superuser route)
const verifyUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  const updatedUser = await UserServices.verifyUser(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User verified successfully",
    data: updatedUser,
  });
};
const getAllUsers = catchAsync(async(req:Request,res:Response)=>{
  const users = await UserServices.getAllUsers();
  sendResponse(res,{
    statusCode:200,
    success:true,
    message:"Users fetched successfully",
    data:users
  });
});
export const UserControllers = {
  registerUser,
 
  verifyUser,
  getAllUsers
};
