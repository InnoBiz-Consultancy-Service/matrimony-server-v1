import { Types } from "mongoose";

export type SubscriptionStatus = "active" | "inactive" | "expired";
export type SubscriptionType = "premium" | "vip"|"free";

export interface ISubscription {
  _id?: string | Types.ObjectId;
  userId: Types.ObjectId;
  type: SubscriptionType;
  durationInMonths: number;
  startDate?: Date;
  endDate?: Date;
  status: SubscriptionStatus;
  profileViewLimit?: number; // NEW
  createdAt?: Date;
  updatedAt?: Date;
}
