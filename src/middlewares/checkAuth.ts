import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import jwt from "jsonwebtoken";
import User from "../app/module/user/user.model";
import CustomJwtPayload from "../types/checkAuth.interface";
import { SubscriptionType } from "../app/module/subscription/subscription.interface";

const checkAuth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError(401, "You are not authorized.");
    }

    // Extract token properly (remove Bearer if exists)
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    let decoded: CustomJwtPayload;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret") as CustomJwtPayload;
    } catch (err) {
      throw new AppError(401, "Invalid or expired token.");
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new AppError(401, "User not found.");
    }

    // ✅ Role check from DB, not from decoded
    if (requiredRoles.length && !requiredRoles.includes(user.role)) {
      throw new AppError(403, "You are not permitted for this action.");
    }

    // Attach user info to request
    req.user = {
      userId: user._id.toString(),
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      role: user.role,
      hasBiodata: decoded.hasBiodata || false,
      subscriptionType: (decoded.subscriptionType || user.subscriptionType || 'free') as SubscriptionType,
      phone: user.phone,
      isVerified: user.isVerified,
      agreeToPrivacy: user.agreeToPrivacy,
      agreeToTerms: user.agreeToTerms,
      subscriptionId: user.subscriptionId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    next();
  });
};

export default checkAuth;
