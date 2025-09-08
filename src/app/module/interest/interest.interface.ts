import { Types } from "mongoose";

export interface IInterest {
  _id?: Types.ObjectId;
  sender: Types.ObjectId;   // logged in user
  receiver: Types.ObjectId; // যাকে interest পাঠানো হয়েছে
  status: "sent" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}
