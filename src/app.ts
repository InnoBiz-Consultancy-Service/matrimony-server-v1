import express, { Request, Response } from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import router from "./routers";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";


console.log("App starting...");

const app = express();
app.use(cookieParser());
app.use(express.json());
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
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Alhamdulilah Server is running...." });
});

app.use(globalErrorHandler);

export default app;
