import express from "express";
import { ProfileVisitController } from "./profileVisit.controller";
import checkAuth from "../../../middlewares/checkAuth";
import { USER_ROLE } from "../../../types/global";

const router = express.Router();

router.post(
  "/:biodataId",
  checkAuth(USER_ROLE.USER),
  ProfileVisitController.viewContactInfo
);
router.get(
  "/profile-view-status",
  checkAuth(USER_ROLE.USER),
  ProfileVisitController.getProfileViewStatus
);

const profileVisitRoutes = router;

export default profileVisitRoutes;
