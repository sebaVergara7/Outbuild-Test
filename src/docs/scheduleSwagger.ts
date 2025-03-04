const scheduleSwagger = {
  "/api/schedules": {
    get: {
      summary: "Get all schedules",
      tags: ["Schedules"],
      security: [{ bearerAuth: [] }],
      responses: {
        200: { description: "Schedules found" },
        401: { description: "Unauthorized" },
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
        201: { description: "Schedule created successfully" },
        400: { description: "Bad request" },
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
        {
          in: "query",
          name: "page",
          required: false,
          description: "Page number",
          schema: { type: "integer" },
        },
        {
          in: "query",
          name: "pageSize",
          required: false,
          description: "Number of items per page",
          schema: { type: "integer" },
        },
      ],
      responses: {
        200: { description: "Schedule found" },
        401: { description: "Unauthorized" },
        404: { description: "Schedule not found" },
      },
    },
  },
};

export default scheduleSwagger;
