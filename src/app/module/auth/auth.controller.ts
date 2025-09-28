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
import User from "../user/user.model";


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


 res.cookie("token", accessToken, {
        httpOnly: true,
        secure: true, // Production এ অবশ্যই true (HTTPS লাগবে)
        sameSite: "none", // Cross-origin এর জন্য
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      });
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


// export const googleCallbackController = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userFromPassport = req.user as AuthUser;

//       if (!userFromPassport) {
//         return res.redirect(`${envVars.FRONTEND_URL}/login?error=no_user_found`);
//       }

//       // DB থেকে fetch করা
//       const user = await User.findById(userFromPassport.userId).lean();

//       if (!user) {
//         return res.redirect(`${envVars.FRONTEND_URL}/login?error=user_not_found`);
//       }

//       // JWT create করো যদি চাও
//       const token = jwt.sign(
//         {
//           userId: user._id.toString(),
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

//       // cookie set
//       res.cookie("token", token, {
// httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//   maxAge: 7 * 24 * 60 * 60 * 1000,
//   path: "/",
 
// });

//       // profile check
//       if (!user.isProfileCompleted) {
//         return res.redirect(`${process.env.FRONTEND_URL}/profile-complete`);
//       }

//       // normal redirect
//     res.redirect(`${envVars.FRONTEND_URL}`);


//     } catch (error) {
//       console.error("❌ Google callback error:", error);
//       res.redirect(`${envVars.FRONTEND_URL}/login?error=server_error`);
//     }
//   }
// );



export const googleCallbackController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userFromPassport = req.user as AuthUser;
      if (!userFromPassport) {
        return res.redirect(`${envVars.FRONTEND_URL}/login?error=no_user_found`);
      }

      const user = await User.findById(userFromPassport.userId).lean();
      if (!user) {
        return res.redirect(`${envVars.FRONTEND_URL}/login?error=user_not_found`);
      }

      const token = jwt.sign(
        {
          userId: user._id.toString(),
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

      // Cross-origin cookie settings
      res.cookie("token", token, {
        httpOnly: true,
        secure: true, // Production এ অবশ্যই true (HTTPS লাগবে)
        sameSite: "none", // Cross-origin এর জন্য
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      });

      if (!user.isProfileCompleted) {
        return res.redirect(`${envVars.FRONTEND_URL}/profile-complete`);
      }

      res.redirect(`${envVars.FRONTEND_URL}`);
    } catch (error) {
      console.error("❌ Google callback error:", error);
      res.redirect(`${envVars.FRONTEND_URL}/login?error=server_error`);
    }
  }
);