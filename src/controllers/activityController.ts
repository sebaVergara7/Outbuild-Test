import { Request, Response } from "express";
import {
  addActivity,
  addMultipleActivities,
  getActivitiesBySchedule,
} from "../services/activityService";
import { handleError } from "../utils/errorHandler";
import { HTTP_STATUS_CODES } from "../constants/httpStatusCodes";

export const addActivityHandler = async (req: Request, res: Response) => {
  try {
    const { scheduleId, name, startDate, endDate } = req.body;
    const userId = req.user.userId;

    const activity = await addActivity(
      userId,
      scheduleId,
      name,
      new Date(startDate),
      new Date(endDate)
    );

    res.status(HTTP_STATUS_CODES.CREATED).json(activity);
  } catch (error) {
    handleError(error, res);
  }
};

export const getActivitiesHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const activities = await getActivitiesBySchedule(
      userId,
      id,
      page,
      pageSize
    );

    res.status(HTTP_STATUS_CODES.OK).json(activities);
  } catch (error) {
    handleError(error, res);
  }
};

export const addMultipleActivitiesHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { scheduleId, activities } = req.body;
    const userId = req.user.userId;
    const result = await addMultipleActivities(userId, scheduleId, activities);

    res
      .status(HTTP_STATUS_CODES.CREATED)
      .json({ message: "Activities added", count: (await result).count });
  } catch (error) {
    handleError(error, res);
  }
};
