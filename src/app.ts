import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./config/passport";
import router from "./routers";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { notFoundHandler } from "./utils/notFound";

const app = express();

// Cookie parser
app.use(cookieParser());

// Body parser
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: [
      "https://nikah-test.vercel.app",
      "http://localhost:3000",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET || "your-super-secret-session-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// API routes
app.use("/api/v1", router);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Matrimony Server is running...." });
});

// Error handlers
app.use(globalErrorHandler);
app.use(notFoundHandler);

export default app;