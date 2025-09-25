// // src/app/module/auth/auth.route.ts
// import express from "express";
// import { validateRequest } from "../../../middlewares/validateRequest";
// import catchAsync from "../../../utils/catchAsync";
// import { loginSchema } from "./auth.validation";
// import { googleCallbackController, loginUser, logoutUser, resetPassword } from "./auth.controller";
// import passport from "passport";
// import { envVars } from "../../../config/envConfig";

// const router = express.Router();

// // ------------------ Normal Auth ------------------
// router.post("/login", validateRequest(loginSchema), catchAsync(loginUser));
// router.post("/logout", catchAsync(logoutUser));
// router.post("/reset-password", resetPassword);

// // ------------------ Google Auth ------------------
// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"], session: false })
// );
// // src/app/module/auth/auth.route.ts
// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: `${envVars.FRONTEND_URL}/login?error=auth_failed`,
//     session: false,
//   }),
//   googleCallbackController
// );

// export const AuthRoutes = router;

// src/app/module/auth/auth.route.ts
import express from "express";
import { validateRequest } from "../../../middlewares/validateRequest";
import catchAsync from "../../../utils/catchAsync";
import { loginSchema } from "./auth.validation";
import {
  googleCallbackController,
  loginUser,
  logoutUser,
  resetPassword,
} from "./auth.controller";
import passport from "passport"; // Direct passport import
import { envVars } from "../../../config/envConfig";

const router = express.Router();

// ------------------ Normal Auth ------------------
router.post("/login", validateRequest(loginSchema), catchAsync(loginUser));
router.post("/logout", catchAsync(logoutUser));
router.post("/reset-password", resetPassword);

// ------------------ Google Auth ------------------
router.get(
  "/google",
  (req, res, next) => {
    next();
  },
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  (req, res, next) => {
    next();
  },
  passport.authenticate("google", {
    failureRedirect: `${envVars.FRONTEND_URL}/login?error=auth_failed`,
    session: false,
  }),
  googleCallbackController
);

export const AuthRoutes = router;
