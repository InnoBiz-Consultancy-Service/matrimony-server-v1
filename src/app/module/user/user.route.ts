import express from "express";
import { loginSchema, userRegisterSchema } from "./user.validation";
import { UserControllers } from "./user.controller";
import catchAsync from "../../utils/catchAsync";
import { validateRequest } from "../../utils/validateRequest";
const router = express.Router();
// disturb
router.post("/register", validateRequest(userRegisterSchema), UserControllers.registerUser);
router.post("/login", validateRequest(loginSchema), catchAsync(UserControllers.loginUser));
router.post("/logout", catchAsync(UserControllers.logoutUser));
router.patch("/:id/verify", catchAsync(UserControllers.verifyUser));
export const UserRoutes = router;

