// biodata.routes.ts
import express from "express";
import { BiodataControllers } from "./biodata.controller";
import { USER_ROLE } from "../../../types/global";

import catchAsync from "../../../utils/catchAsync";
import checkAuth from "../../../middlewares/checkAuth";

const router = express.Router();

// User own biodata create or update
router.post(
  "/",
  checkAuth(USER_ROLE.USER),
  catchAsync(BiodataControllers.createOrUpdateBiodata)
);

// User own biodata update
router.patch(
  "/",
  checkAuth(USER_ROLE.USER),
  catchAsync(BiodataControllers.updateOwnBiodata)
);

// Get all approved biodata (admin or user)
router.get(
  "/all",
  checkAuth(USER_ROLE.ADMIN),
  catchAsync(BiodataControllers.getAllBiodata)
);

// Get own biodata (logged in user)
router.get(
  "/my-biodata",
  checkAuth(USER_ROLE.USER),
  catchAsync(BiodataControllers.getOwnBiodata)
);

// Get biodata by userId (admin only)
router.get(
  "/:id",
  checkAuth(USER_ROLE.ADMIN),
  catchAsync(BiodataControllers.getBiodataById)
);

// Approve or reject biodata (admin only)
router.patch(
  "/:id/approval",
  checkAuth(USER_ROLE.ADMIN),
  catchAsync(BiodataControllers.approveOrRejectBiodata)
);

// Get all pending biodata (admin only)
router.get(
  "/pending",
  checkAuth(USER_ROLE.ADMIN),
  catchAsync(BiodataControllers.getPendingBiodata)
);

export const BiodataRoutes = router;
