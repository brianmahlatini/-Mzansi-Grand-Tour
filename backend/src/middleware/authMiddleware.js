// Purpose: Authenticates JWT bearer tokens and exposes role-aware guards for
// protected user and admin API routes.
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { pool } from "../db/postgres.js";

export async function authenticate(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const payload = jwt.verify(token, env.jwt.secret);
    const { rows } = await pool.query(
      "SELECT id, username, email, role, status, created_at FROM users WHERE id = $1",
      [payload.sub]
    );

    if (!rows[0] || rows[0].status !== "active") {
      return res.status(401).json({ message: "User account is not active" });
    }

    req.user = rows[0];
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

export async function optionalAuthenticate(req, _res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return next();
    }

    const payload = jwt.verify(token, env.jwt.secret);
    const { rows } = await pool.query(
      "SELECT id, username, email, role, status, created_at FROM users WHERE id = $1",
      [payload.sub]
    );

    if (rows[0]?.status === "active") {
      req.user = rows[0];
    }

    return next();
  } catch (_error) {
    return next();
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "You do not have access to this resource" });
    }

    return next();
  };
}
