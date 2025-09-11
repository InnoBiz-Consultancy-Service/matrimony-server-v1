import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    // confirmPassword: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], required: true, default: "user" },
    agreeToPrivacy: { type: Boolean, required: true },
    agreeToTerms: { type: Boolean, required: true },
    isVerified: { type: Boolean, required: true, default: false },
 
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);
export default User;