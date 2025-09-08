
import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../../types/global";
import catchAsync from "../../utils/catchAsync";
import { approvePayment, createPayment, getAllPayments } from "./payment.controller";


const router = express.Router();

// Create a payment (User)
router.post("/create", auth(USER_ROLE.USER), catchAsync(createPayment));

// Approve a payment (Admin)
router.put("/approve/:id", auth(USER_ROLE.ADMIN), catchAsync(approvePayment));

// Get all payments (Admin only)
router.get("/all", auth(USER_ROLE.ADMIN), catchAsync(getAllPayments));

export const paymentRoutes =  router;

