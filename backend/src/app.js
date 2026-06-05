// Purpose: Creates the Express application with security, CORS, JSON parsing,
// health checks, and versioned API route registration.
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { contentRouter } from "./routes/contentRoutes.js";
import { conversionRouter } from "./routes/conversionRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.corsOrigin }));
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "mzansi-tourism-api",
      databases: ["postgresql", "mongodb"]
    });
  });

  app.use("/api", contentRouter);
  app.use("/api", conversionRouter);
  app.use(errorHandler);

  return app;
}
