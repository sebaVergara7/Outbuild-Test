import { Request, Response } from "express";
import {
  createSchedule,
  getScheduleById,
  getAllSchedulesByUser,
} from "../services/scheduleService";
import logger from "../utils/logger";
import { handleError } from "../utils/errorHandler";
import { HTTP_STATUS_CODES } from "../constants/httpStatusCodes";

export const createScheduleHandler = async (req: Request, res: Response) => {
  try {
    const { name, imageUrl } = req.body;
    const userId = req.user.userId;
    if (!userId) {
      res
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ error: "Unauthorized" });
      return;
    }

    const schedule = await createSchedule(name, imageUrl, userId);
    logger.info(`Schedule created: ${schedule.id} by User ${userId}`);
    res.status(HTTP_STATUS_CODES.CREATED).json(schedule);
  } catch (error) {
    handleError(error, res);
  }
};

export const getScheduleHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    if (!userId) {
      res
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ error: "Unauthorized" });
      return;
    }

    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const schedule = await getScheduleById(id, userId, page, pageSize);
    if (!schedule) {
      res
        .status(HTTP_STATUS_CODES.NOT_FOUND)
        .json({ error: "Schedule not found" });
      return;
    }

    res.json(schedule);
  } catch (error) {
    handleError(error, res);
  }
};

export const getAllSchedulesHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;

    if (!userId) {
      res
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ error: "Unauthorized" });
      return;
    }

    const schedules = await getAllSchedulesByUser(userId);
    res.json(schedules);
  } catch (error) {
    handleError(error, res);
  }
};
