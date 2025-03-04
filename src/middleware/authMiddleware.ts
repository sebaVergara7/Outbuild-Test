import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HTTP_STATUS_CODES } from "../constants/httpStatusCodes";

const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({ error: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(HTTP_STATUS_CODES.FORBIDDEN).json({ error: "Invalid token" });
  }
};
