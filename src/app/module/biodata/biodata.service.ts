import Biodata from "./biodata.model";
import { ApprovalStatus, IBiodata } from "./biodata.interface";
import mongoose from "mongoose";
import User from "../user/user.model";
import { createUserTokens } from "../../../utils/userToken";
import { Ignore } from "../ignoreList/ignoreList.model";
import Trash from "../trash/trash.model";

const createBiodata = async (data: IBiodata, userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User does not exist. Cannot create biodata.");
  }

  // Check if biodata already exists
  const existingBiodata = await Biodata.findOne({ userId });
  if (existingBiodata) {
    throw new Error("Biodata already exists for this user.");
  }

  // Create new biodata
  const biodata = new Biodata({ ...data, userId });
  await biodata.save();

  // Generate access token
  const { accessToken } = createUserTokens({
    ...user.toObject(),
    hasBiodata: true,
  });

  return { biodata, accessToken };
};

const updateOwnBiodata = async (
  userId: string,
  updateData: Partial<IBiodata>
) => {
  return await Biodata.findOneAndUpdate(
    { userId,  },
    updateData,
    { new: true }
  );
};

const getAllBiodata = async (filters: any, currentUserId: string) => {
  const conditions: any[] = [];

  conditions.push({ isApproved: ApprovalStatus.APPROVED });


  const ignored = await Ignore.find({ user: currentUserId }).select(
    "ignoredUser"
  );
  const ignoredIds = ignored.map((i) => i.ignoredUser);
  if (ignoredIds.length > 0) {
    conditions.push({ userId: { $nin: ignoredIds } });
  }

  // ... rest of your filter conditions remain same ...

  const query = { $and: conditions };

  const result = await Biodata.find(query).populate(
    "userId",
    "username  role"
  );
  return result;
};

const getBiodataById = async (biodataId: string, currentUserId: string) => {
  if (!mongoose.Types.ObjectId.isValid(biodataId)) {
    throw new Error("Invalid biodata ID");
  }

  const biodata = await Biodata.findOne({
    _id: biodataId,
  }).populate("userId", "username email role phone");

  if (!biodata) return null;

  const isIgnored = await Ignore.findOne({
    user: new mongoose.Types.ObjectId(currentUserId),
    ignoredUser: biodata.userId._id,
  });

  if (isIgnored) return null;

  return biodata;
};

const approveOrRejectBiodata = async (id: string, status: ApprovalStatus) => {
  if (![ApprovalStatus.APPROVED, ApprovalStatus.REJECTED].includes(status)) {
    throw new Error("Invalid status. Must be 'approved' or 'rejected'");
  }

  return await Biodata.findByIdAndUpdate(
    id,
    { isApproved: status },
    { new: true }
  );
};

const getPendingBiodata = async () => {
  return await Biodata.find({
    isApproved: ApprovalStatus.PENDING,
  }).populate("userId", "username email role phone");
};

const getOwnBiodata = async (userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }

  return await Biodata.findOne({
    userId: new mongoose.Types.ObjectId(userId),
  }).populate("userId", "username email role");
};

const deleteOwnBiodata = async (userId: string) => {


 
  const biodata = await Biodata.findOne({ userId });
  if (!biodata) {
    throw new Error("Biodata not found");
  }


  const trashed = new Trash({
  data: JSON.parse(JSON.stringify(biodata)), 
      deletedAt: new Date(),
  });

  await trashed.save();

  await Biodata.deleteOne({ userId });

  return trashed;
};

export const BiodataServices = {
  createBiodata,
  updateOwnBiodata,
  getAllBiodata,
  getBiodataById,
  approveOrRejectBiodata,
  getPendingBiodata,
  getOwnBiodata,
  deleteOwnBiodata, 
};
