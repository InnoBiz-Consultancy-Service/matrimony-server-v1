// biodata.routes.ts
import express from "express";
import { USER_ROLE } from "../../../types/global";

import catchAsync from "../../../utils/catchAsync";
import checkAuth from "../../../middlewares/checkAuth";
import { BiodataControllers } from "./biodata.controller";
import { biodataSchema } from "./biodata.validation";
import { validateRequest } from "../../../middlewares/validateRequest";

const router = express.Router();

// biodata.routes.ts
router.post("/", checkAuth(USER_ROLE.USER), validateRequest(biodataSchema), BiodataControllers.createOrUpdateBiodata);
router.patch("/", checkAuth(USER_ROLE.USER), BiodataControllers.updateOwnBiodata);
router.get("/all", BiodataControllers.getAllBiodata);
router.delete("/",checkAuth(USER_ROLE.USER),BiodataControllers.deleteOwnBiodata)
router.get("/my-biodata", checkAuth(USER_ROLE.USER), BiodataControllers.getOwnBiodata);
router.get("/pending", checkAuth(USER_ROLE.ADMIN), BiodataControllers.getPendingBiodata);
router.get("/:id", BiodataControllers.getBiodataById);

router.patch("/approval/:id", checkAuth(USER_ROLE.ADMIN), BiodataControllers.approveOrRejectBiodata);



export const BiodataRoutes = router;
