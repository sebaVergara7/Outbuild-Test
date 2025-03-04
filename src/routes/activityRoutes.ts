import { Router } from "express";
import {
  addActivityHandler,
  addMultipleActivitiesHandler,
  getActivitiesHandler,
} from "../controllers/activityController";
import { authenticateToken } from "../middleware/authMiddleware";
import { validationMiddleware } from "../middleware/validationMiddleware";
import {
  BulkCreateActivitiesDto,
  CreateActivityDto,
} from "../dto/activity.dto";

const router = Router();

router.post(
  "/",
  validationMiddleware(CreateActivityDto),
  authenticateToken,
  addActivityHandler
);

router.get("/:id", authenticateToken, getActivitiesHandler);

router.post(
  "/bulk",
  validationMiddleware(BulkCreateActivitiesDto),
  authenticateToken,
  addMultipleActivitiesHandler
);

export default router;
