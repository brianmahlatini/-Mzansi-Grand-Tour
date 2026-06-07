// Purpose: Provides authenticated traveler dashboard APIs for profile overview,
// owned booking history, booking cancellation, and personalized trip planning.
import express from "express";
import { z } from "zod";
import { pool } from "../db/postgres.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { recordAuditEvent } from "../services/auditService.js";

export const userRouter = express.Router();

const cancelSchema = z.object({
  reason: z.string().min(5).max(600)
});

userRouter.use("/me", authenticate);

userRouter.get("/me/dashboard", async (req, res, next) => {
  try {
    const [bookings, leads] = await Promise.all([
      pool.query("SELECT * FROM bookings WHERE user_id = $1 ORDER BY created_at DESC", [req.user.id]),
      pool.query("SELECT * FROM leads WHERE user_id = $1 ORDER BY created_at DESC", [req.user.id])
    ]);

    res.json({
      data: {
        user: req.user,
        bookings: bookings.rows,
        leads: leads.rows,
        nextTrip: bookings.rows.find((booking) => !["cancelled", "completed"].includes(booking.status)) || null
      }
    });
  } catch (error) {
    next(error);
  }
});

userRouter.get("/me/bookings", async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM bookings WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user.id]
    );
    res.json({ data: rows });
  } catch (error) {
    next(error);
  }
});

userRouter.patch("/me/bookings/:id/cancel", async (req, res, next) => {
  try {
    const payload = cancelSchema.parse(req.body);
    const { rows } = await pool.query(
      `UPDATE bookings
       SET status = 'cancelled', cancellation_reason = $1, cancelled_at = NOW()
       WHERE id = $2 AND user_id = $3 AND status <> 'cancelled'
       RETURNING *`,
      [payload.reason, req.params.id, req.user.id]
    );

    if (!rows[0]) {
      return res.status(404).json({ message: "Active booking was not found for this account" });
    }

    await recordAuditEvent({
      userId: req.user.id,
      action: "user.booking_cancelled",
      entityType: "booking",
      entityId: req.params.id,
      metadata: { reason: payload.reason }
    });

    return res.json({ data: rows[0] });
  } catch (error) {
    return next(error);
  }
});
