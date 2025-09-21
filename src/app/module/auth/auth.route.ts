import express from "express";
import { validateRequest } from "../../../middlewares/validateRequest";
import catchAsync from "../../../utils/catchAsync";
import { loginSchema } from "./auth.validation";
import { googleCallbackController, loginUser, logoutUser, resetPassword } from "./auth.controller";
import passport from "passport";


const router = express.Router();

router.post("/login", validateRequest(loginSchema), catchAsync(loginUser));
router.post("/logout", catchAsync(logoutUser));
router.post("/reset-password",resetPassword );
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));


// Google callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  googleCallbackController
);

export const AuthRoutes = router;

