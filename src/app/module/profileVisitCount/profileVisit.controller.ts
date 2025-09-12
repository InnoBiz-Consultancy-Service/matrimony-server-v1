import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { ProfileVisitService } from "./profileVisit.service";
import { sendResponse } from "../../../utils/sendResponse";
import ProfileVisit from "./profileVisit.model";
import User from "../user/user.model";


const viewContactInfo = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId as string;
  const { biodataId } = req.params;

  const result = await ProfileVisitService.viewContactInfo(userId, biodataId);
 sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Profile visit information retrieved successfully",
      data: result,
    });
});
const getProfileViewStatus = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId as string;
  const result = await ProfileVisitService.getProfileViewStatus(userId);

  res.status(200).json({
    success: true,
    data: result,
  });
});
export const ProfileVisitController = { viewContactInfo, getProfileViewStatus };
