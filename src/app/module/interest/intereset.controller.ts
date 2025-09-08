import { Request, Response } from "express";
import { InterestServices } from "./interest.service";
import Subscription from "../subscription/subscription.model";

const sendInterest = async (req: Request, res: Response) => {
  try {
    const senderId = req.user?.userId;
    if (!senderId) {
      return res.status(401).json({ message: "Unauthorized: userId missing" });
    }
    const { receiverId } = req.body;
    if (!receiverId) {
      return res.status(400).json({ message: "receiverId is required" });
    }

    // subscription check
    const activeSub = await Subscription.findOne({ userId: senderId, status: "active" });
    if (!activeSub) throw new Error("Active subscription required");

    const interest = await InterestServices.sendInterest(senderId, receiverId);
    res.status(201).json({ message: "Interest sent", data: interest });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const cancelInterest = async (req: Request, res: Response) => {
  try {
    const senderId = req.user?.userId;
    if (!senderId) {
      return res.status(401).json({ message: "Unauthorized: userId missing" });
    }
    const { receiverId } = req.params;

    const result = await InterestServices.cancelInterest(senderId, receiverId);
    if (!result) throw new Error("No active interest found");

    res.status(200).json({ message: "Interest cancelled", data: result });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const getSentInterests = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: userId missing" });
    }

    const interests = await InterestServices.getSentInterests(userId);
    res.status(200).json({ message: "Sent interests fetched", data: interests });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const getReceivedInterests = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: userId missing" });
    }

    const interests = await InterestServices.getReceivedInterests(userId);
    res.status(200).json({ message: "Received interests fetched", data: interests });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const InterestControllers = {
  sendInterest,
  cancelInterest,
  getSentInterests,
  getReceivedInterests,
};
