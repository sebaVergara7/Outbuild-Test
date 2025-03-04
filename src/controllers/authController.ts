import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";
import logger from "../utils/logger";
import { handleError } from "../utils/errorHandler";
import { HTTP_STATUS_CODES } from "../constants/httpStatusCodes";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await registerUser(email, password);
    logger.info(`User registered: ${user.email}`);
    res
      .status(HTTP_STATUS_CODES.CREATED)
      .json({ message: "User registered", userId: user.id });
  } catch (error) {
    handleError(error, res);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token } = await loginUser(email, password);
    logger.info(`User logged in: ${email}`);
    res.json({ token });
  } catch (error) {
    handleError(error, res, 401);
  }
};
