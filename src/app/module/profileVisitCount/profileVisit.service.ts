import Subscription from "../subscription/subscription.model";
import User from "../user/user.model";
import ProfileVisit from "./profileVisit.model";
import { Types } from "mongoose";

const viewContactInfo = async (userId: string, profileId: string) => {
  // Step 1: User + subscription check
  const user = await User.findById(userId).populate("subscriptionId");
  if (!user || !user.subscriptionId) {
    return { access: "denied", message: "No active subscription" };
  }

  const subscription: any = user.subscriptionId;

  // Step 2: Already viewed check
  let profileVisit = await ProfileVisit.findOne({ userId });
  if (profileVisit?.visitedProfiles?.some((p: any) => p.profileId.toString() === profileId)) {
    return { access: "granted", pointsDeducted: 0, alreadyViewed: true, remaining: subscription.profileViewLimit };
  }

  // Step 3: Limit check
  if ((subscription.profileViewLimit ?? 0) <= 0) {
    return { access: "denied", message: "Profile view limit exceeded", remaining: 0 };
  }

  // Step 4: Deduct point from subscription
  const updatedSubscription = await Subscription.findByIdAndUpdate(
    subscription._id,
    { $inc: { profileViewLimit: -1 } },
    { new: true }
  );

  // Step 5: Update ProfileVisit
  if (!profileVisit) {
    profileVisit = await ProfileVisit.create({
      userId,
      visitedProfiles: [{ profileId: new Types.ObjectId(profileId), contactViewed: true, viewedAt: new Date(), count: 1 }],
      totalVisitedCount: 1,
    });
  } else {
    profileVisit.visitedProfiles.push({ profileId: new Types.ObjectId(profileId), contactViewed: true, viewedAt: new Date(), count: 1 });
    profileVisit.totalVisitedCount = (profileVisit.totalVisitedCount || 0) + 1;
    await profileVisit.save();
  }

  // Step 6: If profileViewLimit is 0, expire subscription & downgrade user
  if ((updatedSubscription?.profileViewLimit ?? 0) <= 0) {
    // Update subscription status
    await Subscription.findByIdAndUpdate(subscription._id, { status: "expired" });

    // Update user
    await User.findByIdAndUpdate(userId, {
      subscriptionType: "free",
     
    });
  }

  return {
    access: "granted",
    pointsDeducted: 1,
    remaining: updatedSubscription?.profileViewLimit,
    profileVisit,
    subscriptionStatus: (updatedSubscription?.profileViewLimit ?? 0) <= 0 ? "expired" : "active",
    currentPackage: (updatedSubscription?.profileViewLimit ?? 0) <= 0 ? "free" : subscription.subscriptionType,
  };
};
const getProfileViewStatus = async (userId: string) => {
  
  const user = await User.findById(userId).populate("subscriptionId");
  if (!user) throw new Error("User not found");

  const subscription: any = user.subscriptionId;

  
  const profileVisit = await ProfileVisit.findOne({ userId });
  const totalViewed = profileVisit?.totalVisitedCount || 0;

  
  const remaining = subscription ? (subscription.profileViewLimit - totalViewed) : 0;

  return {
    totalViewed,
    remaining,
    package: subscription?.subscriptionType || "free",
  };
};

export const ProfileVisitService = { viewContactInfo, getProfileViewStatus };
