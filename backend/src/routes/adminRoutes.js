// Purpose: Provides administrator-only dashboards for users, leads, bookings,
// audit history, and operational metrics across the tourism platform.
import express from "express";
import { pool } from "../db/postgres.js";
import { authenticate, requireRole } from "../middleware/authMiddleware.js";
import { recordAuditEvent } from "../services/auditService.js";

export const adminRouter = express.Router();

adminRouter.use("/admin", authenticate, requireRole("ADMIN"));

adminRouter.get("/admin/dashboard", async (_req, res, next) => {
  try {
    const [metrics, bookingsByStatus, recentBookings, recentLeads, users] = await Promise.all([
      pool.query(`
        SELECT
          (SELECT COUNT(*)::int FROM users) AS users,
          (SELECT COUNT(*)::int FROM bookings) AS bookings,
          (SELECT COUNT(*)::int FROM bookings WHERE status = 'cancelled') AS cancellations,
          (SELECT COUNT(*)::int FROM leads) AS leads,
          (SELECT COUNT(*)::int FROM packages) AS packages
      `),
      pool.query("SELECT status, COUNT(*)::int AS count FROM bookings GROUP BY status ORDER BY status"),
      pool.query(`
        SELECT b.*, u.username
        FROM bookings b
        LEFT JOIN users u ON u.id = b.user_id
        ORDER BY b.created_at DESC
        LIMIT 8
      `),
      pool.query("SELECT * FROM leads ORDER BY created_at DESC LIMIT 8"),
      pool.query("SELECT id, username, email, role, status, created_at, last_login_at FROM users ORDER BY created_at DESC LIMIT 8")
    ]);

    res.json({
      data: {
        metrics: metrics.rows[0],
        bookingsByStatus: bookingsByStatus.rows,
        recentBookings: recentBookings.rows,
        recentLeads: recentLeads.rows,
        recentUsers: users.rows
      }
    });
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/admin/bookings", async (_req, res, next) => {
  try {
    const { rows } = await pool.query(`
      SELECT b.*, u.username
      FROM bookings b
      LEFT JOIN users u ON u.id = b.user_id
      ORDER BY b.created_at DESC
    `);
    res.json({ data: rows });
  } catch (error) {
    next(error);
  }
});

adminRouter.patch("/admin/bookings/:id/status", async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ["new", "reviewing", "confirmed", "completed", "cancelled"];

    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Unsupported booking status" });
    }

    const { rows } = await pool.query(
      `UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *`,
      [status, req.params.id]
    );

    if (!rows[0]) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await recordAuditEvent({
      userId: req.user.id,
      action: "admin.booking_status_update",
      entityType: "booking",
      entityId: req.params.id,
      metadata: { status }
    });

    return res.json({ data: rows[0] });
  } catch (error) {
    return next(error);
  }
});

adminRouter.get("/admin/leads", async (_req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM leads ORDER BY created_at DESC");
    res.json({ data: rows });
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/admin/users", async (_req, res, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, username, email, role, status, created_at, last_login_at FROM users ORDER BY created_at DESC"
    );
    res.json({ data: rows });
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/admin/audit-events", async (_req, res, next) => {
  try {
    const { rows } = await pool.query(`
      SELECT a.*, u.username, u.email
      FROM audit_events a
      LEFT JOIN users u ON u.id = a.user_id
      ORDER BY a.created_at DESC
      LIMIT 80
    `);
    res.json({ data: rows });
  } catch (error) {
    next(error);
  }
});
