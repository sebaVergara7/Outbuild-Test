import { randomUUID } from "crypto";
import { paginationParameters } from "./commonParameters";
import { HTTP_STATUS_CODES } from "../constants/httpStatusCodes";

const activitySwagger = {
  "/api/activities": {
    post: {
      summary: "Add an activity",
      tags: ["Activities"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                scheduleId: {
                  type: "string",
                  example: randomUUID(),
                },
                name: { type: "string", example: "Work" },
                startDate: {
                  type: "string",
                  format: "date-time",
                  example: "2021-09-01T00:00:00Z",
                },
                endDate: {
                  type: "string",
                  format: "date-time",
                  example: "2021-09-01T08:00:00Z",
                },
              },
            },
          },
        },
      },
      responses: {
        [HTTP_STATUS_CODES.CREATED]: {
          description: "Activity added successfully",
        },
        [HTTP_STATUS_CODES.BAD_REQUEST]: { description: "Bad request" },
      },
    },
  },
  "/api/activities/{id}": {
    get: {
      summary: "Get activities by schedule ID",
      tags: ["Activities"],
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
        [HTTP_STATUS_CODES.OK]: { description: "Activities found" },
        [HTTP_STATUS_CODES.BAD_REQUEST]: { description: "Bad request" },
        [HTTP_STATUS_CODES.UNAUTHORIZED]: { description: "Unauthorized" },
      },
    },
  },
  "/api/activities/bulk": {
    post: {
      summary: "Add multiple activities",
      tags: ["Activities"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                scheduleId: { type: "string", example: randomUUID() },
                activities: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string", example: "Work" },
                      startDate: {
                        type: "string",
                        format: "date-time",
                        example: "2021-09-01T00:00:00Z",
                      },
                      endDate: {
                        type: "string",
                        format: "date-time",
                        example: "2021-09-01T08:00:00Z",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        [HTTP_STATUS_CODES.CREATED]: {
          description: "Activities added successfully",
        },
        [HTTP_STATUS_CODES.BAD_REQUEST]: { description: "Bad request" },
      },
    },
  },
};

export default activitySwagger;
