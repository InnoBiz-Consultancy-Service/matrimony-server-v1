import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../app/module/user/user.model";
import { BiodataServices } from "../app/module/biodata/biodata.service";
import Payment from "../app/module/payment/payment.model";
import { AuthUser, SubscriptionType } from "../app/module/user/user.interface";

// Type guard for SubscriptionType validation
function isValidSubscriptionType(type: any): type is SubscriptionType {
  return type && ["free", "premium", "vip"].includes(type);
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (accessToken: string, refreshToken: string, profile: any, done: any) => {
      try {
        const email = profile.emails?.[0].value;
        if (!email) return done(null, false, { message: "No email found" });

        let user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "User not found. Please sign up first." });
        }

        // Get additional user data with proper error handling
        let hasBiodata = false;
        let subscriptionType: SubscriptionType = "free";

        try {
          hasBiodata = !!(await BiodataServices.getOwnBiodata(user.userId as string));
        } catch (error) {
          console.warn("Error fetching biodata:", error);
          hasBiodata = false;
        }

        try {
          const latestPayment = await Payment.findOne({ userId: user._id })
            .sort({ paymentDate: -1 })
            .lean();
          
          // Ensure subscriptionType is of correct type
          const paymentSubscriptionType = latestPayment?.subscriptionType;
          if (isValidSubscriptionType(paymentSubscriptionType)) {
            subscriptionType = paymentSubscriptionType;
          } else if (isValidSubscriptionType(user.subscriptionType)) {
            subscriptionType = user.subscriptionType;
          } else {
            subscriptionType = "free";
          }
        } catch (error) {
          console.warn("Error fetching payment:", error);
          subscriptionType = isValidSubscriptionType(user.subscriptionType) 
            ? user.subscriptionType 
            : "free";
        }

        const extendedUser: AuthUser = {
          userId: user._id.toString(),
          email: user.email,
          _id: user._id,
          name: user.name,
          gender: user.gender,
          role: user.role || "user",
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

        return done(null, extendedUser);
      } catch (err) {
        console.error("Google strategy error:", err);
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
      let hasBiodata = false;
      let subscriptionType: SubscriptionType = "free";

      try {
        hasBiodata = !!(await BiodataServices.getOwnBiodata(user.userId as string));
      } catch (error) {
        console.warn("Error fetching biodata in deserialize:", error);
        hasBiodata = false;
      }

      try {
        const latestPayment = await Payment.findOne({ userId: user._id })
          .sort({ paymentDate: -1 })
          .lean();
        
        const paymentSubscriptionType = latestPayment?.subscriptionType;
        if (isValidSubscriptionType(paymentSubscriptionType)) {
          subscriptionType = paymentSubscriptionType;
        } else if (isValidSubscriptionType(user.subscriptionType)) {
          subscriptionType = user.subscriptionType;
        } else {
          subscriptionType = "free";
        }
      } catch (error) {
        console.warn("Error fetching payment in deserialize:", error);
        subscriptionType = isValidSubscriptionType(user.subscriptionType) 
          ? user.subscriptionType 
          : "free";
      }

      const extendedUser: AuthUser = {
        userId: user._id.toString(),
        email: user.email,
        _id: user._id,
        name: user.name,
        gender: user.gender,
        role: user.role || "user",
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

      done(null, extendedUser);
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err);
  }
});

export default passport;