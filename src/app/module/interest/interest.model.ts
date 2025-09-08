import { Schema, model } from "mongoose";
import { IInterest } from "./interest.interface";

const interestSchema = new Schema<IInterest>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["sent", "cancelled"], default: "sent" },
  },
  { timestamps: true }
);

const Interest = model<IInterest>("Interest", interestSchema);
export default Interest;
