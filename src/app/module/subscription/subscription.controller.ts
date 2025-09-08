import { Request, Response } from "express";
import { SubscriptionServices } from "./subscription.service";
import mongoose from "mongoose";
const createSubscription = async (req: Request, res: Response) => {
  try {
    const { type, durationInMonths, profileViewLimit } = req.body;
    const userId = new mongoose.Types.ObjectId(req.user?.userId);

    const subscription = await SubscriptionServices.createSubscription({
      userId,
      type,
      durationInMonths,
      profileViewLimit,
      status: "inactive",
    });

    res.status(201).json({ message: "Subscription created", data: subscription });
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Failed to create subscription" });
  }
};


const activateSubscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subscription = await SubscriptionServices.activateSubscription(id);

    res.status(200).json({ message: "Subscription activated", data: subscription });
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Failed to activate subscription" });
  }
};

const getAllSubscriptions = async (req: Request, res: Response) => {
  try {
    const subscriptions = await SubscriptionServices.getAllSubscriptions();
    res.status(200).json({ message: "All subscriptions fetched", data: subscriptions });
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Failed to fetch subscriptions" });
  }
};

const getSubscriptionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subscription = await SubscriptionServices.getSubscriptionById(id);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.status(200).json({ message: "Subscription fetched", data: subscription });
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Failed to fetch subscription" });
  }
};

export const SubscriptionControllers = {
  createSubscription,
  activateSubscription,
  getAllSubscriptions,
  getSubscriptionById,
};
