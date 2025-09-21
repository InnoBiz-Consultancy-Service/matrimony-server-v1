import { sendResponse } from "../../../utils/sendResponse";
import { NextFunction, Request, Response } from "express";
import { setAuthCookie } from "../../../utils/setCookie";
import { UserServices } from "../user/user.service";
import { BiodataServices } from "../biodata/biodata.service";
import Payment from "../payment/payment.model";
import jwt from "jsonwebtoken";
import catchAsync from "../../../utils/catchAsync";
import { AuthServices } from "./auth.service";

import { envVars } from "../../../config/envConfig";
import { AuthUser } from "../user/user.interface";




export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Email and password required",
        data: null,
      });
    }

    const user = await UserServices.loginUserFromDB({ email, password });
const userId = user.userId || user._id.toString();
    const hasBiodata = !!(await BiodataServices.getOwnBiodata(userId));

    const latestPayment = await Payment.findOne({ userId })
      .sort({ paymentDate: -1 })
      .lean();

    const subscriptionType = latestPayment?.subscriptionType || "free";


    const accessToken = jwt.sign(
      {
        userId: user._id.toString(),
        name: user.name,
        email: user.email,
        gender: user.gender,
        role: user.role,
        hasBiodata,
        subscriptionType, 
      },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "7d" }
    );


    setAuthCookie(res, { accessToken });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Login successful",
      data: {
        userId: user._id.toString(),
        name: user.name,
        email: user.email,
        gender: user.gender,
        role: user.role,
        hasBiodata,
        subscriptionType,
        token: accessToken,
      },
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 401,
      success: false,
      message: error.message || "Login failed",
      data: null,
    });
  }
};

// Logout
export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("accessToken");
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Logout successful",
    data: null,
  });
};

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { email, newPassword } = req.body;

  const result = await AuthServices.resetPassword(email, newPassword);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result.message,
    data: null,
  });
});



export const googleCallbackController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as AuthUser;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please sign up first.",
        data: null,
      });
    }

    console.log("Google OAuth User received:", user); // Debug log

    // Use the user data that's already been prepared by Passport strategy
    // No need to re-fetch biodata and subscription - it's already in the user object
    const hasBiodata = user.hasBiodata || false;
    const subscriptionType = user.subscriptionType || "free";

    // JWT Payload with the user data from Passport
    const payload = {
      userId: user.userId,
      name: user.name,
      email: user.email,
      gender: user.gender,
      role: user.role || "user",
      hasBiodata,
      subscriptionType,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || "defaultsecret", {
      expiresIn: "7d",
    });

    // Set both HTTP-only and regular cookies
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("token", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Set user role cookie for frontend
    res.cookie("userRole", user.role || "user", {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Redirect to frontend
    let redirectTo = req.query.state as string | undefined;
    if (redirectTo && redirectTo.startsWith("/")) {
      redirectTo = redirectTo.slice(1);
    }

    console.log("Redirecting to:", `${envVars.FRONTEND_URL}}`);
    
    res.redirect(`${envVars.FRONTEND_URL}`);
  }
);


