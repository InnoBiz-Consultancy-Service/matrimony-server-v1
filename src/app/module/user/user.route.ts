import express from "express";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../../middlewares/validateRequest";
import catchAsync from "../../../utils/catchAsync";
import { userRegisterSchema } from "./user.validation";
import checkAuth from "../../../middlewares/checkAuth";
import { USER_ROLE } from "../../../types/global";

const router = express.Router();
router.post("/register", validateRequest(userRegisterSchema), catchAsync(UserControllers.registerUser));
router.get("/all",checkAuth(USER_ROLE.ADMIN),UserControllers.getAllUsers);
router.patch("/:id/verify", catchAsync(UserControllers.verifyUser));
export const UserRoutes = router;

