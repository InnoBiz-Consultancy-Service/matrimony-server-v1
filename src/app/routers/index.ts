import { Router } from "express";
import { UserRoutes } from "../module/user/user.route";

import { BiodataRoutes } from "../module/biodata/biodata.route";
import { sendOtp, verifyOtp } from "../controllers/OTPSend";
import { paymentRoutes } from "../module/payment/payment.route";
import { Interest } from "../module/interest/interest.route";
const router = Router();

const moduleROuters = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/biodata",
    route: BiodataRoutes,
  },

  {
    path: "/send-otp",
    route: sendOtp,
  },
  {
    path: "/verify-otp",
    route: verifyOtp,
  },
  {
    path: "/payment",
    route: paymentRoutes,
  },
  {
    path: "/interest",
    route: Interest,
  },
];
moduleROuters.forEach((route) => router.use(route.path, route.route));
export default router;
