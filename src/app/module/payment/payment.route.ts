
import express from "express";
import { USER_ROLE } from "../../../types/global";
import { approvePayment, createPayment, getAllPayments } from "./payment.controller";
import catchAsync from "../../../utils/catchAsync";
import auth from "../../../middlewares/auth";


const router = express.Router();

// Create a payment (User)
router.post("/create", auth(USER_ROLE.USER), catchAsync(createPayment));

// Approve a payment (Admin)
router.put("/approve/:id", auth(USER_ROLE.ADMIN), catchAsync(approvePayment));

// Get all payments (Admin only)
router.get("/all", auth(USER_ROLE.ADMIN), catchAsync(getAllPayments));

export const paymentRoutes =  router;

