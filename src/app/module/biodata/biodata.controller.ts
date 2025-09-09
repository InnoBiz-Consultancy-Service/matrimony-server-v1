import { Request, Response } from "express";
import { BiodataServices } from "./biodata.service";
import { sendResponse } from "../../../utils/sendResponse";

const createOrUpdateBiodata = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId as string;
    const data = { ...req.body, userId };

    const biodata = await BiodataServices.createOrUpdateBiodata(data, userId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Biodata saved successfully",
      data: biodata,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message || "Failed to save biodata",
      data: null,
    });
  }
};

const updateOwnBiodata = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId as string;
    const updateData = req.body;

    const updated = await BiodataServices.updateOwnBiodata(userId, updateData);

    if (!updated) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Biodata not found",
        data: null,
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Own biodata updated successfully",
      data: updated,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message || "Failed to update biodata",
      data: null,
    });
  }
};

const getAllBiodata = async (req: Request, res: Response) => {
  try {
    const filters = req.query;
    const biodatas = await BiodataServices.getAllBiodata(filters);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All biodata fetched successfully",
      data: biodatas,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message || "Failed to fetch biodata",
      data: null,
    });
  }
};

const getBiodataById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const biodata = await BiodataServices.getBiodataById(id);

    if (!biodata) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Biodata not found",
        data: null,
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Biodata fetched successfully",
      data: biodata,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message || "Failed to fetch biodata",
      data: null,
    });
  }
};

const updateBiodataById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updated = await BiodataServices.updateBiodataById(id, updateData);

    if (!updated) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Biodata not found",
        data: null,
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Biodata updated successfully",
      data: updated,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message || "Failed to update biodata",
      data: null,
    });
  }
};

const getOwnBiodata = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId as string;

    if (!userId) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Unauthorized",
        data: null,
      });
    }

    const biodata = await BiodataServices.getOwnBiodata(userId);

    if (!biodata) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "No biodata found for this user",
        data: null,
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Own biodata fetched successfully",
      data: biodata,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message || "Failed to fetch own biodata",
      data: null,
    });
  }
};

export const BiodataControllers = {
  createOrUpdateBiodata,
  updateOwnBiodata,
  getAllBiodata,
  getBiodataById,
  updateBiodataById,
  getOwnBiodata,
};
