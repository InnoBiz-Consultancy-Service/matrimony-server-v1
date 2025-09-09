import express from "express";
// import { biodataSchema } from "./biodata.validation";
import { BiodataControllers } from "./biodata.controller";
import { USER_ROLE } from "../../../types/global";
import auth from "../../../middlewares/auth";
import catchAsync from "../../../utils/catchAsync";

const router = express.Router();

// user own biodata create or update
router.post(
  "/",
  auth(USER_ROLE.USER),
  catchAsync(BiodataControllers.createOrUpdateBiodata)
);

// router.post(
//   "/",
//   auth(USER_ROLE.USER),
//   (req, res, next) => {
//     console.log("👉 Request Body:", req.body);
//     next();
//   },
//   // validateRequest(biodataSchema),
//   catchAsync(BiodataControllers.createOrUpdateBiodata)
// );


// user own biodata update
router.patch(
  "/",
  auth(USER_ROLE.USER),
  // validateRequest(biodataSchema),
  catchAsync(BiodataControllers.updateOwnBiodata)
);

// get all biodata (admin or user)
router.get("/", catchAsync(BiodataControllers.getAllBiodata));
// get own biodata (only the logged in user's)
router.get(
  "/my-biodata",
  auth(USER_ROLE.USER),
  catchAsync(BiodataControllers.getOwnBiodata)
);
// get biodata by id
router.get(
  "/:id",
  auth(USER_ROLE.USER),
  catchAsync(BiodataControllers.getBiodataById)
);

// update biodata by id
router.patch(
  "/:id",
  auth(USER_ROLE.USER),
  // validateRequest(biodataSchema),
  catchAsync(BiodataControllers.updateBiodataById)
);

export const BiodataRoutes = router;
