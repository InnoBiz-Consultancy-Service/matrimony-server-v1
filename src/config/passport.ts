import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import User from "../app/module/user/user.model";
import { BiodataServices } from "../app/module/biodata/biodata.service";
import Payment from "../app/module/payment/payment.model";
import { AuthUser } from "../app/module/user/user.interface";








passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
      try {
        const email = profile.emails?.[0].value;
        if (!email) return done(null, false, { message: "No email found" });

        let user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "User not found. Please sign up first." });
        }

        // Get additional user data
        const hasBiodata = !!(await BiodataServices.getOwnBiodata(user?.userId as string));
        
        const latestPayment = await Payment.findOne({ userId: user._id })
          .sort({ paymentDate: -1 }) 
          .lean();

        const subscriptionType = latestPayment?.subscriptionType || user.subscriptionType || "free";

   
        const extendedUser: AuthUser = {
          userId: user._id.toString(),         
          email: user.email,
          _id: user._id,
          name: user.name,
      
          gender: user.gender,
          role: user.role,
          hasBiodata,
          subscriptionType,
          phone: user.phone,
          isVerified: user.isVerified,
          agreeToPrivacy: user.agreeToPrivacy,
          agreeToTerms: user.agreeToTerms,
          subscriptionId: user.subscriptionId,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        };

        return done(null, extendedUser as any);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user._id || user.userId);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    if (user) {
      const hasBiodata = !!(await BiodataServices.getOwnBiodata(user?.userId as string));
      
      const latestPayment = await Payment.findOne({ userId: user._id })
        .sort({ paymentDate: -1 }) 
        .lean();

      const subscriptionType = latestPayment?.subscriptionType || user.subscriptionType || "free";

      const extendedUser: AuthUser = {
        userId: user._id.toString(),
        email: user.email,
        _id: user._id,
        name: user.name,
     
        gender: user.gender,
        role: user.role,
        hasBiodata,
        subscriptionType,
        phone: user.phone,
        isVerified: user.isVerified,
        agreeToPrivacy: user.agreeToPrivacy,
        agreeToTerms: user.agreeToTerms,
        subscriptionId: user.subscriptionId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };

      done(null, extendedUser as any);
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err);
  }
});

export default passport;