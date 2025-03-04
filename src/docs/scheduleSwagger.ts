import { HTTP_STATUS_CODES } from "../constants/httpStatusCodes";
import { paginationParameters } from "./commonParameters";

const scheduleSwagger = {
  "/api/schedules": {
    get: {
      summary: "Get all schedules",
      parameters: [...paginationParameters],
      tags: ["Schedules"],
      security: [{ bearerAuth: [] }],
      responses: {
        [HTTP_STATUS_CODES.OK]: { description: "Schedules found" },
        [HTTP_STATUS_CODES.UNAUTHORIZED]: { description: "Unauthorized" },
      },
    },
    post: {
      summary: "Create a new schedule",
      tags: ["Schedules"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                imageUrl: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        [HTTP_STATUS_CODES.CREATED]: {
          description: "Schedule created successfully",
        },
        [HTTP_STATUS_CODES.BAD_REQUEST]: { description: "Bad request" },
      },
    },
  },
  "/api/schedules/{id}": {
    get: {
      summary: "Get a schedule by its ID",
      tags: ["Schedules"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "ID of the schedule",
          schema: { type: "string" },
        },
        ...paginationParameters,
      ],
      responses: {
        [HTTP_STATUS_CODES.OK]: { description: "Schedule found" },
        [HTTP_STATUS_CODES.UNAUTHORIZED]: { description: "Unauthorized" },
        [HTTP_STATUS_CODES.NOT_FOUND]: { description: "Schedule not found" },
      },
    },
  },
};

export default scheduleSwagger;
