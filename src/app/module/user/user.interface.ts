import { Types } from "mongoose";

export type UserRole = "user" | "admin";

export interface IUser {
  _id?: string | Types.ObjectId;
  name: string;
  password: string;
  // confirmPassword: string;
  gender: "male" | "female";
  email: string;
  phone: string;
  role: UserRole;
  agreeToPrivacy: boolean;
  agreeToTerms: boolean;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}