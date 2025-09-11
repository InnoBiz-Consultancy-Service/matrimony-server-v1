// ignore.route.ts
import express from "express";
import { IgnoreController } from "./ignoreList.controller";
import checkAuth from "../../../middlewares/checkAuth";
import { USER_ROLE } from "../../../types/global";

const router = express.Router();

router.post("/ignore", checkAuth(USER_ROLE.USER), IgnoreController.ignoreUser);
router.post("/unignore", checkAuth(USER_ROLE.USER), IgnoreController.unignoreUser);
router.get("/ignored", checkAuth(USER_ROLE.USER), IgnoreController.getIgnoredUsers);

export const IgnoreRoutes = router;
