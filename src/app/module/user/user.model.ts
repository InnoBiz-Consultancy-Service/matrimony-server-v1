// user.model.ts
import { Schema, model } from "mongoose";
import { IUser, GenderType, UserRole, SubscriptionType } from "./user.interface";

const userSchema = new Schema<IUser>(
  { 
    userId: { type: String, unique: true, sparse: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"] as GenderType[], required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"] as UserRole[], required: true, default: "user" },
    agreeToPrivacy: { type: Boolean, required: true },
    agreeToTerms: { type: Boolean, required: true },
    isVerified: { type: Boolean, default: false },
    subscriptionType: { type: String, enum: ["free", "premium", "vip"] as SubscriptionType[], default: "free" },
    subscriptionId: { type: Schema.Types.ObjectId, ref: "Subscription" }, 
  },
  { timestamps: true }
);

userSchema.pre('save', function(next) {
  if (this.isNew && !this.userId) {
    this.userId = this._id.toString();
  }
  next();
});

const User = model<IUser>("User", userSchema);
export default User;