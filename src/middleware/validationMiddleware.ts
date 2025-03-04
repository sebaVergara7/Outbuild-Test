import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS_CODES } from "../constants/httpStatusCodes";

const formatErrors = (errors: ValidationError[]): string => {
  return errors
    .map((error: ValidationError) => {
      if (error.children && error.children.length > 0) {
        return formatErrors(error.children);
      }
      return Object.values(error.constraints || {}).join(", ");
    })
    .join(", ");
};

export const validationMiddleware = (type: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(type, req.body);
    const errors: ValidationError[] = await validate(dto);

    if (errors.length > 0) {
      const message = formatErrors(errors);
      res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: message });
      return;
    } else {
      req.body = dto;
      next();
    }
  };
};
