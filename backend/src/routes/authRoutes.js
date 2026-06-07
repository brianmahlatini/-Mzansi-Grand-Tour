// Purpose: Handles registration, login, and current-user lookup with the
// first registered account automatically becoming the system administrator.
import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { env } from "../config/env.js";
import { pool } from "../db/postgres.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { recordAuditEvent } from "../services/auditService.js";

export const authRouter = express.Router();

const registerSchema = z.object({
  username: z.string().min(3).max(80).regex(/^[a-zA-Z0-9_.-]+$/),
  email: z.string().email().max(160),
  password: z.string().min(8).max(120)
});

const loginSchema = z.object({
  username: z.string().min(1).max(160).optional(),
  email: z.string().email().max(160).optional(),
  password: z.string().min(1).max(120)
}).refine((payload) => payload.username || payload.email, {
  message: "Username or email is required",
  path: ["username"]
});

function publicUser(row) {
  return {
    id: row.id,
    username: row.username,
    email: row.email,
    role: row.role,
    status: row.status,
    createdAt: row.created_at,
    lastLoginAt: row.last_login_at
  };
}

function issueToken(user) {
  return jwt.sign({ sub: user.id, role: user.role, email: user.email }, env.jwt.secret, {
    expiresIn: env.jwt.expiresIn
  });
}

authRouter.post("/auth/register", async (req, res, next) => {
  try {
    const payload = registerSchema.parse(req.body);
    const existing = await pool.query("SELECT COUNT(*)::int AS count FROM users");
    const role = existing.rows[0].count === 0 ? "ADMIN" : "USER";
    const passwordHash = await bcrypt.hash(payload.password, 12);

    const { rows } = await pool.query(
      `INSERT INTO users (username, email, password_hash, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, username, email, role, status, created_at, last_login_at`,
      [payload.username, payload.email.toLowerCase(), passwordHash, role]
    );

    await recordAuditEvent({
      userId: rows[0].id,
      action: "auth.register",
      entityType: "user",
      entityId: rows[0].id,
      metadata: { role }
    });

    res.status(201).json({ data: { user: publicUser(rows[0]), token: issueToken(rows[0]) } });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Username or email is already registered" });
    }
    return next(error);
  }
});

authRouter.post("/auth/login", async (req, res, next) => {
  try {
    const payload = loginSchema.parse(req.body);
    const identifier = (payload.email || payload.username || "").toLowerCase();
    const { rows } = await pool.query(
      `SELECT id, username, email, password_hash, role, status, created_at, last_login_at
       FROM users WHERE lower(email) = $1 OR lower(username) = $1`,
      [identifier]
    );

    const user = rows[0];
    const isValid = user ? await bcrypt.compare(payload.password, user.password_hash) : false;

    if (!user || !isValid || user.status !== "active") {
      return res.status(401).json({ message: "Invalid login details" });
    }

    const updated = await pool.query(
      `UPDATE users SET last_login_at = NOW()
       WHERE id = $1
       RETURNING id, username, email, role, status, created_at, last_login_at`,
      [user.id]
    );

    await recordAuditEvent({
      userId: user.id,
      action: "auth.login",
      entityType: "user",
      entityId: user.id
    });

    return res.json({ data: { user: publicUser(updated.rows[0]), token: issueToken(updated.rows[0]) } });
  } catch (error) {
    return next(error);
  }
});

authRouter.get("/auth/me", authenticate, (req, res) => {
  res.json({ data: { user: publicUser(req.user) } });
});
