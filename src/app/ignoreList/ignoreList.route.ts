// ignore.route.ts
import express from "express";
import { IgnoreController } from "./ignoreList.controller";
import { USER_ROLE } from "../types/global";
import checkAuth from "../../middlewares/checkAuth";

const router = express.Router();

router.post("/ignore", checkAuth(USER_ROLE.USER), IgnoreController.ignoreUser);
router.post("/unignore", checkAuth(USER_ROLE.USER), IgnoreController.unignoreUser);
router.get("/ignored", checkAuth(USER_ROLE.USER), IgnoreController.getIgnoredUsers);

export const IgnoreRoutes = router;
