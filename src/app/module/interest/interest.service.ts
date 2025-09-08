import Interest from "./interest.model";
import { IInterest } from "./interest.interface";

const sendInterest = async (senderId: string, receiverId: string): Promise<IInterest> => {
  const existing = await Interest.findOne({ sender: senderId, receiver: receiverId, status: "sent" });
  if (existing) throw new Error("Interest already sent");

  const interest = new Interest({ sender: senderId, receiver: receiverId });
  return await interest.save();
};

const cancelInterest = async (senderId: string, receiverId: string): Promise<IInterest | null> => {
  return await Interest.findOneAndUpdate(
    { sender: senderId, receiver: receiverId, status: "sent" },
    { status: "cancelled" },
    { new: true }
  );
};

const getSentInterests = async (userId: string) => {
  return await Interest.find({ sender: userId, status: "sent" }).populate("receiver", "name email");
};

const getReceivedInterests = async (userId: string) => {
  return await Interest.find({ receiver: userId, status: "sent" }).populate("sender", "name email");
};

export const InterestServices = {
  sendInterest,
  cancelInterest,
  getSentInterests,
  getReceivedInterests,
};
