import { Response } from "express";
import logger from "../utils/logger";
import {
  HTTP_STATUS_CODES,
  HttpStatusCode,
} from "../constants/httpStatusCodes";

export const handleError = (
  error: unknown,
  res: Response,
  status: HttpStatusCode = HTTP_STATUS_CODES.BAD_REQUEST
) => {
  let message = "Unknown error";

  if (error instanceof Error) {
    message = error.message;
  }

  logger.error(message);
  res.status(status).json({ error: message });
};
