import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../app/module/user/user.model";
import { AuthUser } from "../app/module/user/user.interface";
import jwt from "jsonwebtoken";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (accessToken, refreshToken, profile, done) => {
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
