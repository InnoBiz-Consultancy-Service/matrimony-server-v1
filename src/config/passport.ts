import passport, { Profile } from "passport";
import { Strategy as GoogleStrategy, VerifyCallback } from "passport-google-oauth20";
import User from "../app/module/user/user.model";
import { USER_ROLE } from "../types/global";

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

        const user = await User.findOne({ email });
        if (!user) {
          // Auto sign-up disabled
          return done(null, false, { message: "User not found. Please sign up first." });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
