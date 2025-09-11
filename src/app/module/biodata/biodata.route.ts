// biodata.routes.ts
import express from "express";
import { USER_ROLE } from "../../../types/global";

import catchAsync from "../../../utils/catchAsync";
import checkAuth from "../../../middlewares/checkAuth";
import { BiodataControllers } from "./biodata.controller";

const router = express.Router();

// biodata.routes.ts
router.post("/", checkAuth(USER_ROLE.USER), BiodataControllers.createOrUpdateBiodata);
router.patch("/", checkAuth(USER_ROLE.USER), BiodataControllers.updateOwnBiodata);
router.get("/all", checkAuth(USER_ROLE.ADMIN), BiodataControllers.getAllBiodata);
router.get("/my-biodata", checkAuth(USER_ROLE.USER), BiodataControllers.getOwnBiodata);
router.get("/:id", checkAuth(USER_ROLE.ADMIN), BiodataControllers.getBiodataById);
router.patch("/:id/approval", checkAuth(USER_ROLE.ADMIN), BiodataControllers.approveOrRejectBiodata);
router.get("/pending", checkAuth(USER_ROLE.ADMIN), BiodataControllers.getPendingBiodata);


export const BiodataRoutes = router;
