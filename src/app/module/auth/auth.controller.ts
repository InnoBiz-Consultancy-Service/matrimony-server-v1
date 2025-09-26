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
    try {
      const user = req.user as AuthUser;

      if (!user) {
        console.log("❌ Google OAuth: No user found in request");
        return res.redirect(`${envVars.FRONTEND_URL}/login?error=no_user_found`);
      }

      const token = jwt.sign(
        {
          userId: user.userId,
          name: user.name,
          email: user.email,
          gender: user.gender,
          role: user.role || "user",
          hasBiodata: user.hasBiodata || false,
          subscriptionType: user.subscriptionType || "free",
        },
        process.env.JWT_SECRET || "defaultsecret",
        { expiresIn: "7d" }
      );

      // Simple cookie configuration
      const cookieOptions: {
        httpOnly: boolean;
        secure: boolean;
        sameSite: "lax" | "strict" | "none";
        maxAge: number;
        path: string;
        domain?: string;
      } = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
        ...(process.env.NODE_ENV === "production" && process.env.COOKIE_DOMAIN && {
          domain: process.env.COOKIE_DOMAIN
        })
      };

      res.cookie("token", token, cookieOptions);
      
      console.log('✅ Google OAuth Cookie Set Successfully');
      
      res.redirect(`${envVars.FRONTEND_URL}/auth/success?userId=${user.userId}`);

    } catch (error) {
      console.error("❌ Google callback error:", error);
      res.redirect(`${envVars.FRONTEND_URL}/login?error=server_error`);
    }
  }
);

// export const googleCallbackController = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const user = req.user as AuthUser;

//       if (!user) {
//         console.log("❌ Google OAuth: No user found in request");
//         return res.redirect(`${envVars.FRONTEND_URL}/login?error=no_user_found`);
//       }

//       console.log("✅ Google OAuth User Received:", {
//         userId: user.userId,
//         email: user.email,
//         name: user.name
//       });

//       const token = jwt.sign(
//         {
//           userId: user.userId,
//           name: user.name,
//           email: user.email,
//           gender: user.gender,
//           role: user.role || "user",
//           hasBiodata: user.hasBiodata || false,
//           subscriptionType: user.subscriptionType || "free",
//         },
//         process.env.JWT_SECRET || "defaultsecret",
//         { expiresIn: "7d" }
//       );

//       const isProduction = process.env.NODE_ENV === "production";
      
//       const cookieOptions: {
//         httpOnly: boolean;
//         secure: boolean;
//         sameSite: 'lax' | 'strict' | 'none';
//         maxAge: number;
//         path: string;
//         domain?: string;
//       } = {
//         httpOnly: true,
//         secure: isProduction,
//         sameSite: isProduction ? 'none' : 'lax',
//         maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//         path: '/',
//       };

//       if (isProduction) {
//         cookieOptions.domain = "http://localhost:3000"; 
//       }

//       res.cookie("accessToken", token, cookieOptions);

//       console.log('✅ Google OAuth Cookie Set Successfully');

//       // Success redirect
//       res.redirect(`${envVars.FRONTEND_URL}/auth/success?token=${token}&userId=${user.userId}`);
      
//     } catch (error) {
//       console.error("❌ Google callback error:", error);
//       res.redirect(`${envVars.FRONTEND_URL}/login?error=server_error`);
//     }
//   }
// );