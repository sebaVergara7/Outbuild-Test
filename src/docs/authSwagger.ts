import { HTTP_STATUS_CODES } from "../constants/httpStatusCodes";

const authSwagger = {
  "/api/auth/register": {
    post: {
      summary: "Register a user",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  format: "email",
                  example: "example@test.com",
                },
                password: { type: "string", example: "psw123", length: 6 },
              },
            },
          },
        },
      },
      responses: {
        [HTTP_STATUS_CODES.CREATED]: {
          description: "User registered successfully",
        },
        [HTTP_STATUS_CODES.BAD_REQUEST]: { description: "Bad request" },
      },
    },
  },
  "/api/auth/login": {
    post: {
      summary: "Log in",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string" },
                password: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        [HTTP_STATUS_CODES.OK]: { description: "Returns a JWT token" },
        [HTTP_STATUS_CODES.UNAUTHORIZED]: {
          description: "Invalid credentials",
        },
      },
    },
  },
};

export default authSwagger;
