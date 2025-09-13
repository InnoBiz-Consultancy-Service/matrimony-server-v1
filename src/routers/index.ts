import { Router } from "express";
import { UserRoutes } from "../app/module/user/user.route";
import { BiodataRoutes } from "../app/module/biodata/biodata.route";
import { sendOtp, verifyOtp } from "../app/controllers/OTPSend";
import { paymentRoutes } from "../app/module/payment/payment.route";
import { Interest } from "../app/module/interest/interest.route";
import { AuthRoutes } from "../app/module/auth/auth.route";
import { subscriptionRoutes } from "../app/module/subscription/subscription.route";
import { IgnoreRoutes } from "../app/module/ignoreList/ignoreList.route";
import profileVisitRoutes from "../app/module/profileVisitCount/profileVisit.route";
import { MailRoutes } from "../app/module/sendMail/sendMail.route";
import { ReviewRoutes } from "../app/module/review/review.route";
import { SpecialOfferRoutes } from "../app/module/specialOffers/specialOffer.route";


const router = Router();

const moduleROuters = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
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
  {
    path: "/subscription",
    route: subscriptionRoutes,
  },
  {
    path: "/ignore",
    route: IgnoreRoutes,
  },
  {
    path: "/profile-visit",
    route: profileVisitRoutes,
  },
  {
    path: "/mail",
    route: MailRoutes,
  },
  {
    path: "/review",
    route: ReviewRoutes,
  },
  {
    path: "/special-offers",
    route: SpecialOfferRoutes,
  }
];
moduleROuters.forEach((route) => router.use(route.path, route.route));
export default router;
