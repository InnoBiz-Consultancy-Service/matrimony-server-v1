import Payment from "./payment.model";
import Subscription from "../subscription/subscription.model";
import User from "../user/user.model";
import { IPayment } from "./payment.interface";

const createPayment = async (data: IPayment) => {
  const payment = new Payment(data);
  return await payment.save();
};

const approvePayment = async (paymentId: string) => {
  const payment = await Payment.findById(paymentId);
  if (!payment) throw new Error("Payment not found");

  // Update payment status
  payment.approvalStatus = "approved";
  await payment.save();

  const durationInMonths = payment.durationInMonths || 1;

  // Create subscription
  const subscription = await Subscription.create({
    userId: payment.userId,
    type: payment.subscriptionType,
    durationInMonths,
    status: "active",
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + Number(durationInMonths))),
    profileViewLimit: payment.subscriptionType === "vip" ? 100 : 20,
  });

  // Update user info
  const userUpdate: any = {
    subscriptionStatus: "active",
    subscriptionType: payment.subscriptionType,
    profileViewLimit: subscription.profileViewLimit,
  };

  if (payment.subscriptionType === "vip") {
    userUpdate.subscriberVIP = true;
  } else {
    userUpdate.subscriberPremium = true;
  }

  await User.findByIdAndUpdate(payment.userId, userUpdate);

  return subscription;
};

const getAllPayments = async () => {
  return await Payment.find().populate("userId", "username email role");
};

export const PaymentServices = {
  createPayment,
  approvePayment,
  getAllPayments,
};
