import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { sendResponse } from "../../../utils/sendResponse";
import catchAsync from "../../../utils/catchAsync";
import { generateOTP } from "../../../utils/generateOTP";
import { sendOtpEmail } from "../../services/emailService";
import { OtpModel } from "../otp/OtpModel";
import User from "./user.model";

// ======================
// Register User
// ======================
const registerUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Email already taken",
        data: null,
      });
    }

    const otp = generateOTP();

    await sendOtpEmail(data.email, otp);

    // Step 4: OTP save করো
    await OtpModel.create({ email: data.email, otp });

    const user = await UserServices.registerUserIntoDB({
      ...data,
      isVerified: false,
    });

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User registered successfully. OTP sent to email.",
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

// ======================
// Verify OTP (User Side)
// ======================
const verifyOtp = catchAsync(async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  // 1. Check OTP from DB
  const existingOtp = await OtpModel.findOne({ email, otp });
  if (!existingOtp) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Invalid or expired OTP",
      data: null,
    });
  }

  // 2. Update user isVerified = true
  const updatedUser = await UserServices.verifyUserByEmail(email);

  // 3. Delete OTP after success
  await OtpModel.deleteOne({ email, otp });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User verified successfully via OTP",
    data: updatedUser,
  });
});

// ======================
// Verify User (Admin Route)
// ======================
const verifyUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  const updatedUser = await UserServices.verifyUser(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User verified successfully by Admin",
    data: updatedUser,
  });
};

// ======================
// Get All Users
// ======================
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await UserServices.getAllUsers();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
});

// ======================
// Export Controllers
// ======================
export const UserControllers = {
  registerUser,
  verifyOtp,   
  verifyUser,  
  getAllUsers,
};
