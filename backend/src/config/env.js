// Purpose: Centralizes environment configuration so the rest of the backend can
// depend on a single typed settings object instead of scattered process.env reads.
import dotenv from "dotenv";

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
  postgres: {
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number(process.env.POSTGRES_PORT || 5432),
    database: process.env.POSTGRES_DB || "tourism",
    user: process.env.POSTGRES_USER || "tourism_admin",
    password: process.env.POSTGRES_PASSWORD || "tourism_password"
  },
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/tourism_content",
  jwt: {
    secret: process.env.JWT_SECRET || "local-development-secret-change-me",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  }
};
