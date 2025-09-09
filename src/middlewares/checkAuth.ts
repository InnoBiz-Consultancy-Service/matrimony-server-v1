import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../errors/AppError";
import { envVars } from "../config/envConfig";
import User from "../app/module/user/user.model";
import catchAsync from "../utils/catchAsync";

// Custom type for req.user
export interface AuthUser {
  userId: string;
  email?: string;
  username?: string;
  role?: string;
}

// Middleware
const checkAuth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"

    if (!token) {
      throw new AppError(401, "You are not authorized.");
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, envVars.JWT_ACCESS_SECRET as string) as JwtPayload;
    } catch (err) {
      throw new AppError(401, "Invalid or expired token.");
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new AppError(401, "User not found.");
    }

    if (requiredRoles.length && !requiredRoles.includes(decoded.role as string)) {
      throw new AppError(403, "You are not permitted for this action.");
    }

    // Assign typed user to request
    req.user = {
      userId: decoded.userId as string,
      email: decoded.userEmail as string,
      username: decoded.username as string,
      role: decoded.role as string,
    } as AuthUser;

    next();
  });
};

export default checkAuth;
