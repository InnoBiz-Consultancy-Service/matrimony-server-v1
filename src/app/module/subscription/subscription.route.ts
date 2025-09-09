import express from "express";
import { SubscriptionControllers } from "./subscription.controller";
import { USER_ROLE } from "../../../types/global";
import auth from "../../../middlewares/checkAuth";
import catchAsync from "../../../utils/catchAsync";


const router = express.Router();

router.post("/create", auth(USER_ROLE.USER), SubscriptionControllers.createSubscription);

// activate subscription after payment success (admin or payment callback)
router.patch("/activate/:id", auth(USER_ROLE.ADMIN), SubscriptionControllers.activateSubscription);

// get all subscriptions - admin only
router.get("/all", auth(USER_ROLE.ADMIN), SubscriptionControllers.getAllSubscriptions);

// get single subscription by id - admin only
router.get("/:id", auth(USER_ROLE.ADMIN), catchAsync(SubscriptionControllers.getSubscriptionById));

export default router;
