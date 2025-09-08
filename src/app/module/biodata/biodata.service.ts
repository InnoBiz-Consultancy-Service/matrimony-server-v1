import Biodata from "./biodata.model";
import { IBiodata } from "./biodata.interface";
import mongoose from "mongoose";

const createOrUpdateBiodata = async (data: IBiodata) => {
  const existing = await Biodata.findOne({ userId: data.userId });
  if (existing) {
    return await Biodata.findOneAndUpdate({ userId: data.userId }, data, {
      new: true,
    });
  } else {
    const biodata = new Biodata(data);
    return await biodata.save();
  }
};

const updateOwnBiodata = async (
  userId: string,
  updateData: Partial<IBiodata>
) => {
  return await Biodata.findOneAndUpdate({ userId }, updateData, { new: true });
};

const getAllBiodata = async (filters: any) => {
  const conditions: any[] = [];

  // Name filter
  if (filters.name && filters.name.trim() !== "") {
    conditions.push({ name: { $regex: filters.name, $options: "i" } });
  }

  // Gender filter
  if (filters.gender && filters.gender.trim() !== "") {
    conditions.push({ gender: filters.gender });
  }

  // Age range filter
  if (filters.minAge || filters.maxAge) {
    const ageCondition: any = {};
    if (filters.minAge && !isNaN(Number(filters.minAge)))
      ageCondition.$gte = Number(filters.minAge);
    if (filters.maxAge && !isNaN(Number(filters.maxAge)))
      ageCondition.$lte = Number(filters.maxAge);
    conditions.push({ age: ageCondition });
  }

  // Address filters
  if (filters.division && filters.division.trim() !== "") {
    conditions.push({ "address.present.division": filters.division });
  }
  if (filters.district && filters.district.trim() !== "") {
    conditions.push({ "address.present.district": filters.district });
  }
  if (filters.upazila && filters.upazila.trim() !== "") {
    conditions.push({ "address.present.upazila": filters.upazila });
  }
  if (filters.country && filters.country.trim() !== "") {
    conditions.push({ "address.present.country": filters.country });
  }

  // Marital status filter
  if (filters.maritalStatus && filters.maritalStatus.trim() !== "") {
    conditions.push({ "maritalInfo.maritalStatus": filters.maritalStatus });
  }

  // Education filter
  if (filters.sscGroup && filters.sscGroup.trim() !== "") {
    conditions.push({ "education.sscGroup": filters.sscGroup });
  }
  if (filters.sscResult && filters.sscResult.trim() !== "") {
    conditions.push({ "education.sscResult": filters.sscResult });
  }
  if (filters.hscGroup && filters.hscGroup.trim() !== "") {
    conditions.push({ "education.hscGroup": filters.hscGroup });
  }
  if (filters.hscResult && filters.hscResult.trim() !== "") {
    conditions.push({ "education.hscResult": filters.hscResult });
  }
  if (filters.honours && filters.honours.trim() !== "") {
    conditions.push({
      "education.honours": { $regex: filters.honours, $options: "i" },
    });
  }

  // Physical info
  if (filters.height && filters.height.trim() !== "") {
    conditions.push({ "physicalInfo.height": filters.height });
  }
  if (filters.bodyColor && filters.bodyColor.trim() !== "") {
    conditions.push({ "physicalInfo.bodyColor": filters.bodyColor });
  }

  // Preference
  if (filters.educationLevel && filters.educationLevel.trim() !== "") {
    conditions.push({ "preference.educationLevel": filters.educationLevel });
  }
  if (filters.religiousPractice && filters.religiousPractice.trim() !== "") {
    conditions.push({
      "preference.religiousPractice": filters.religiousPractice,
    });
  }

  // Generic approach: Add any new field from filters automatically
  Object.keys(filters).forEach((key) => {
    if (
      ![
        "name",
        "gender",
        "minAge",
        "maxAge",
        "division",
        "district",
        "upazila",
        "country",
        "maritalStatus",
        "sscGroup",
        "sscResult",
        "hscGroup",
        "hscResult",
        "honours",
        "height",
        "bodyColor",
        "educationLevel",
        "religiousPractice",
      ].includes(key)
    ) {
      conditions.push({ [key]: { $regex: filters[key], $options: "i" } });
    }
  });

  const query = conditions.length > 0 ? { $and: conditions } : {};

  const result = await Biodata.find(query).populate(
    "userId",
    "username email role phone"
  );
  return result;
};

const getBiodataById = async (userId: string) => {
  return await Biodata.findOne({ userId }).populate(
    "userId",
    "username email role phone"
  );
};

const updateBiodataById = async (id: string, updateData: Partial<IBiodata>) => {
  return await Biodata.findByIdAndUpdate(id, updateData, { new: true });
};
const getOwnBiodata = async (userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }

  return await Biodata.findOne({
    userId: new mongoose.Types.ObjectId(userId),
  }).populate("userId", "username email role");
};

export const BiodataServices = {
  createOrUpdateBiodata,
  updateOwnBiodata,
  getAllBiodata,
  getBiodataById,
  updateBiodataById,
  getOwnBiodata,
};
