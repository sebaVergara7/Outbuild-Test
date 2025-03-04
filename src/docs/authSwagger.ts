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
        201: { description: "User registered successfully" },
        400: { description: "Bad request" },
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
        200: { description: "Returns a JWT token" },
        401: { description: "Invalid credentials" },
      },
    },
  },
};

export default authSwagger;
