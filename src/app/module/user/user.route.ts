import express from "express";
import { loginSchema, userRegisterSchema } from "./user.validation";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../../middlewares/validateRequest";
import catchAsync from "../../../utils/catchAsync";

const router = express.Router();
// disturb
router.post("/register", validateRequest(userRegisterSchema), catchAsync(UserControllers.registerUser));
router.post("/login", validateRequest(loginSchema), catchAsync(UserControllers.loginUser));
router.post("/logout", catchAsync(UserControllers.logoutUser));
router.patch("/:id/verify", catchAsync(UserControllers.verifyUser));
export const UserRoutes = router;

