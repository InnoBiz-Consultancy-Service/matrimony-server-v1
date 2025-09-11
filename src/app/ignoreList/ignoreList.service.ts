// ignore.service.ts

import { Ignore } from "./ignoreList.model";

const ignoreUser = async (userId: string, ignoredUserId: string) => {
  if (userId === ignoredUserId) {
    throw new Error("You cannot ignore yourself");
  }

  return await Ignore.findOneAndUpdate(
    { user: userId, ignoredUser: ignoredUserId },
    { user: userId, ignoredUser: ignoredUserId },
    { upsert: true, new: true }
  );
};

const unignoreUser = async (userId: string, ignoredUserId: string) => {
  return await Ignore.findOneAndDelete({ user: userId, ignoredUser: ignoredUserId });
};

const getIgnoredUsers = async (userId: string) => {
  return await Ignore.find({ user: userId }).populate("ignoredUser", "username email");
};

const isIgnored = async (userId: string, targetUserId: string) => {
  return await Ignore.findOne({ user: userId, ignoredUser: targetUserId });
};

export const IgnoreService = {
  ignoreUser,
  unignoreUser,
  getIgnoredUsers,
  isIgnored,
};
