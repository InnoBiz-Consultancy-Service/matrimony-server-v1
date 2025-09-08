
import { Request, Response } from "express";
import { PaymentServices } from "./payment.service";
import mongoose from "mongoose";
import Payment from "./payment.model";

export const createPayment = async (req: Request, res: Response) => {
  try {
    const result = await PaymentServices.createPayment(req.body);
    res.status(201).json({
      success: true,
      message: "Payment created successfully",
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({ success: false, message: error?.message });
  }
};

export const approvePayment = async (req: Request, res: Response) => {
  try {
    const paymentId = req.params.id; // match the route
     if (!mongoose.Types.ObjectId.isValid(paymentId)) {
    throw new Error("Invalid payment ID");
  }

  const payment = await Payment.findById(paymentId);
  if (!payment) throw new Error("Payment not found");
    const result = await PaymentServices.approvePayment(paymentId);
    res.status(200).json({
      success: true,
      message: "Payment approved and subscription created",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllPayments = async (_req: Request, res: Response) => {
  try {
    const result = await PaymentServices.getAllPayments();
    res.status(200).json({
      success: true,
      message: "All payments retrieved",
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
