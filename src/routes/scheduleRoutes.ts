import { Router } from "express";
import {
  createScheduleHandler,
  getScheduleHandler,
  getAllSchedulesHandler,
} from "../controllers/scheduleController";
import { authenticateToken } from "../middleware/authMiddleware";
import { validationMiddleware } from "../middleware/validationMiddleware";
import { CreateScheduleDto } from "../dto/schedule.dto";

const router = Router();

router.post(
  "/",
  validationMiddleware(CreateScheduleDto),
  authenticateToken,
  createScheduleHandler
);

router.get("/:id", authenticateToken, getScheduleHandler);
router.get("/", authenticateToken, getAllSchedulesHandler);

export default router;
