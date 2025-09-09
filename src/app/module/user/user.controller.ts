import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserServices } from "./user.service";
import { sendResponse } from "../../../utils/sendResponse";
import { BiodataServices } from "../biodata/biodata.service";
import { setAuthCookie } from "../../../utils/setCookie";

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

// Login
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

    // Check if user has biodata
    const hasBiodata = !!(await BiodataServices.getOwnBiodata(user._id as string));

    // Create JWT token
    const accessToken = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        userEmail: user.email,
        gender: user.gender,
        role: user.role,
        hasBiodata,
      },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "24h" }
    );

    // Set cookie using utility
    setAuthCookie(res, { accessToken });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Login successful",
      data: {
        userId: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        role: user.role,
        hasBiodata,
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

export const UserControllers = {
  registerUser,
  loginUser,
  logoutUser,
  verifyUser,
};
