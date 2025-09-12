import Payment from "./payment.model";
import Subscription from "../subscription/subscription.model";
import User from "../user/user.model";
import { IPayment } from "./payment.interface";

const createPayment = async (data: IPayment, userId: string) => {
  const payment = new Payment({
    ...data,
    userId,
  });
  return await payment.save();
};
const approvePayment = async (paymentId: string) => {
  const payment = await Payment.findById(paymentId);
  if(!payment) throw new Error("Payment not found");

  payment.approvalStatus = "approved";
  await payment.save();

  const durationInMonths = payment.durationInMonths || 1;

  // Subscription
  const profileViewLimit = payment.subscriptionType === "vip" ? 300 : 100;
  const subscription = await Subscription.create({
    userId: payment.userId,
    subscriptionType: payment.subscriptionType,
    durationInMonths,
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + durationInMonths)),
    status: "active",
    profileViewLimit
  });

  // Update user
  const userUpdate: any = {
    subscriptionType: payment.subscriptionType,
    subscriptionId: subscription._id,
  
  };


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
