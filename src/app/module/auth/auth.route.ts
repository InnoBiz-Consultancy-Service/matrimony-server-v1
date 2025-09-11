import express from "express";
import { validateRequest } from "../../../middlewares/validateRequest";
import catchAsync from "../../../utils/catchAsync";
import { loginSchema } from "./auth.validation";
import { loginUser, logoutUser } from "./auth.controller";

const router = express.Router();

router.post("/login", validateRequest(loginSchema), catchAsync(loginUser));
router.post("/logout", catchAsync(logoutUser));

export const AuthRoutes = router;

