import "reflect-metadata";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import scheduleRoutes from "./routes/scheduleRoutes";
import activityRoutes from "./routes/activityRoutes";
import { setupSwagger } from "./config/swagger";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/activities", activityRoutes);

setupSwagger(app);

export default app;
