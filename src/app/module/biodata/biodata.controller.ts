import { Request, Response } from "express";
import { BiodataServices } from "./biodata.service";
import httpStatus from "http-status-codes";
import { ApprovalStatus } from "./biodata.interface";
import { sendResponse } from "../../../utils/sendResponse";
import catchAsync from "../../../utils/catchAsync";

// Create or update own biodata
const createOrUpdateBiodata = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const data = req.body;

  const result = await BiodataServices.createOrUpdateBiodata(data, userId!);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Biodata created/updated successfully",
    data: result,
  });
});

// Update own biodata
const updateOwnBiodata = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const updateData = req.body;

  const updatedBiodata = await BiodataServices.updateOwnBiodata(
    userId!,
    updateData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Biodata updated successfully",
    data: updatedBiodata,
  });
});

// Get all approved biodata
const getAllBiodata = catchAsync(async (req: Request, res: Response) => {
  const filters = req.query;
  const currentUserId = req.user?.userId;

  const result = await BiodataServices.getAllBiodata(filters, currentUserId!);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All approved biodata fetched successfully",
    data: result,
  });
});

// Get own biodata
const getOwnBiodata = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const result = await BiodataServices.getOwnBiodata(userId!);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Your biodata fetched successfully",
    data: result,
  });
});

// Get biodata by id (admin)
const getBiodataById = catchAsync(async (req: Request, res: Response) => {
  const targetUserId = req.params.id;
  const currentUserId = req.user?.userId;

  const result = await BiodataServices.getBiodataById(targetUserId, currentUserId!);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Biodata fetched successfully",
    data: result,
  });
});

// Approve or reject biodata (admin)
const approveOrRejectBiodata = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { status } = req.body;

  if (!Object.values(ApprovalStatus).includes(status)) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Invalid status value",
      data: null,
    });
  }

  const updatedBiodata = await BiodataServices.approveOrRejectBiodata(id, status);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Biodata ${status} successfully`,
    data: updatedBiodata,
  });
});

// Get all pending biodata (admin)
const getPendingBiodata = catchAsync(async (req: Request, res: Response) => {
  const result = await BiodataServices.getPendingBiodata();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pending biodata fetched successfully",
    data: result,
  });
});

export const BiodataControllers = {
  createOrUpdateBiodata,
  updateOwnBiodata,
  getAllBiodata,
  getOwnBiodata,
  getBiodataById,
  approveOrRejectBiodata,
  getPendingBiodata,
};
