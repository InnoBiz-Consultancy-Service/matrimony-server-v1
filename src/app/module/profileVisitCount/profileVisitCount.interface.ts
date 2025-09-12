import { Types } from "mongoose";

export interface IVisitedProfile {
  profileId: Types.ObjectId;     
  contactViewed: boolean;  
  count?: number;       
  viewedAt: Date;               
}

export interface IProfileVisit {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;        
  visitedProfiles: IVisitedProfile[]; 
  totalVisitedCount?: number;    
  updatedAt?: Date;
}
