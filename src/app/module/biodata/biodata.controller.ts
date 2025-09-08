import { Request, Response } from "express";
import { BiodataServices } from "./biodata.service";

const createOrUpdateBiodata = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const data = { ...req.body, userId };

  const biodata = await BiodataServices.createOrUpdateBiodata(data);
  res.status(200).json({ message: "Biodata saved", data: biodata });
};

const updateOwnBiodata = async (req: Request, res: Response) => {
  const userId = req.user?.userId as string;
  const updateData = req.body;

  const updated = await BiodataServices.updateOwnBiodata(userId, updateData);
  if (!updated) {
    return res.status(404).json({ message: "Biodata not found" });
  }
  res.status(200).json({ message: "Own biodata updated", data: updated });
};

const getAllBiodata = async (req: Request, res: Response) => {
  const filters = req.query;
  const biodatas = await BiodataServices.getAllBiodata(filters);
  res.status(200).json({ message: "All biodata fetched", data: biodatas });
};

const getBiodataById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const biodata = await BiodataServices.getBiodataById(id);
  if (!biodata) {
    return res.status(404).json({ message: "Biodata not found" });
  }
  res.status(200).json({ message: "Biodata fetched", data: biodata });
};

const updateBiodataById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  const updated = await BiodataServices.updateBiodataById(id, updateData);
  if (!updated) {
    return res.status(404).json({ message: "Biodata not found" });
  }
  res.status(200).json({ message: "Biodata updated", data: updated });
};

const getOwnBiodata = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId as string;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const biodata = await BiodataServices.getOwnBiodata(userId);

    if (!biodata) {
      return res
        .status(404)
        .json({ message: "No biodata found for this user" });
    }

    res
      .status(200)
      .json({ success: true, message: "Own biodata fetched", data: biodata });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
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
