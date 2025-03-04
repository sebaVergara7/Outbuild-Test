import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import activitySwagger from "../docs/activitySwagger";
import authSwagger from "../docs/authSwagger";
import scheduleSwagger from "../docs/scheduleSwagger";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Outbuild API",
      version: "1.0.0",
      description:
        "API for managing schedules and activities in construction projects",
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsDoc(options) as {
  paths: Record<string, any>;
};

swaggerSpec.paths = {
  ...swaggerSpec.paths,
  ...activitySwagger,
  ...authSwagger,
  ...scheduleSwagger,
};

export const setupSwagger = (app: Express) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
