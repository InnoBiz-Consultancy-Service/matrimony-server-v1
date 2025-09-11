import express from "express";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../../middlewares/validateRequest";
import catchAsync from "../../../utils/catchAsync";
import { userRegisterSchema } from "./user.validation";

const router = express.Router();
router.post("/register", validateRequest(userRegisterSchema), catchAsync(UserControllers.registerUser));

router.patch("/:id/verify", catchAsync(UserControllers.verifyUser));
export const UserRoutes = router;

