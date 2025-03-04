import { randomUUID } from "crypto";

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
        201: { description: "Activity added successfully" },
        400: { description: "Bad request" },
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
      ],
      responses: {
        200: { description: "Activities found" },
        400: { description: "Bad request" },
        401: { description: "Unauthorized" },
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
        201: { description: "Activities added successfully" },
        400: { description: "Bad request" },
      },
    },
  },
};

export default activitySwagger;
