import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await UserServices.registerUserIntoDB(req.body);
    res.status(201).json({ message: "User registered successfully", data: user, userId: user._id });
  } catch (error: any) {
    res.status(400).json({ message: error.message || "User registration failed" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    let token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];
    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");
        return res.status(400).json({ message: "You are already logged in" });
      } catch {
        // Invalid token - continue to login
      }
    }

    const { email, password } = req.body;

    if (!password || !email) {
      return res.status(400).json({
        message: "Email and password must be provided",
      });
    }

    const user = await UserServices.loginUserFromDB({ email, password });

    const newToken = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        userEmail: user.email,
        gender: user.gender,
        role: user.role
      },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "24h" }
    );

    res.cookie("accessToken", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ token: newToken, message: "Login successful" });
  } catch (error: any) {
    res.status(401).json({ message: error.message || "Login failed" });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  const token = req.cookies?.accessToken;
  if (!token) {
    return res.status(201).json({ message: "Already logged out" });
  }
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logout successful" });
};

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
  verifyUser
};
