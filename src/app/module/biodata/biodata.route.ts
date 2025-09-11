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
router.get("/pending", checkAuth(USER_ROLE.ADMIN), BiodataControllers.getPendingBiodata);
router.get("/:id", checkAuth(USER_ROLE.ADMIN,USER_ROLE.USER), BiodataControllers.getBiodataById);
router.patch("/approval/:id", checkAuth(USER_ROLE.ADMIN), BiodataControllers.approveOrRejectBiodata);



export const BiodataRoutes = router;
