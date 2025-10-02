import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { AuthUser } from "../app/module/user/user.interface";
import { envVars } from "./envConfig";
import User from "../app/module/user/user.model";

passport.use(
  new GoogleStrategy(
    {
      clientID: envVars.GOOGLE_CLIENT_ID!,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET!,
      callbackURL: envVars.GOOGLE_CALLBACK_URL!,
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) return done(null, false, { message: "No email found" });

        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email,
            role: "user",
            isVerified: true,
            agreeToPrivacy: true,
            agreeToTerms: true,
          });
        }

        const authUser: AuthUser = {
          userId: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
        console.log("log form passport.ts file: ", authUser);

        done(null, authUser);
      } catch (err) {
        done(err);
        
      }
    }
  )
);

passport.serializeUser((user: any, done) => done(null, user.userId));
passport.deserializeUser(async (id: string, done) => {
  const user = await User.findById(id);
  if (!user) {
    return done(null, null);
  }
  const authUser: AuthUser = {
    userId: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };
  done(null, authUser);
});
