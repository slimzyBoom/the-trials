import "dotenv/config";
import express, { Request, Response } from "express";
const app = express();
import connectDB from "./configs/database.config.js";
import morgan from "morgan";
import cors from "cors";
import corsOptions from "./configs/cors.config.js";
const PORT = process.env.PORT || 3000;

import authRoutes from "./routes/account.route.js";

connectDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));

app.use("/api/v1/", authRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message:
      "Welcome to the trial of the protocol you have connected successfully",
    success: true,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
