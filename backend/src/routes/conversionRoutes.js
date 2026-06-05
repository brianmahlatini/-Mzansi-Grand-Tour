// Purpose: Handles traveler lead and booking conversion endpoints with validation
// before writing structured records to PostgreSQL.
import express from "express";
import { z } from "zod";
import { pool } from "../db/postgres.js";

export const conversionRouter = express.Router();

const leadSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email().max(160),
  travelStyle: z.string().min(2).max(80),
  dreamTrip: z.string().min(10).max(1000)
});

const bookingSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email().max(160),
  destination: z.string().min(2).max(120),
  guests: z.coerce.number().int().positive().max(30),
  arrivalDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  budgetRange: z.string().min(2).max(80),
  notes: z.string().max(1000).optional().default("")
});

conversionRouter.post("/leads", async (req, res, next) => {
  try {
    const payload = leadSchema.parse(req.body);
    const { rows } = await pool.query(
      `INSERT INTO leads (full_name, email, travel_style, dream_trip)
       VALUES ($1, $2, $3, $4)
       RETURNING id, full_name, email, travel_style, dream_trip, created_at`,
      [payload.fullName, payload.email, payload.travelStyle, payload.dreamTrip]
    );

    res.status(201).json({ data: rows[0] });
  } catch (error) {
    next(error);
  }
});

conversionRouter.post("/bookings", async (req, res, next) => {
  try {
    const payload = bookingSchema.parse(req.body);
    const { rows } = await pool.query(
      `INSERT INTO bookings (full_name, email, destination, guests, arrival_date, budget_range, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, full_name, email, destination, guests, arrival_date, budget_range, notes, status, created_at`,
      [
        payload.fullName,
        payload.email,
        payload.destination,
        payload.guests,
        payload.arrivalDate,
        payload.budgetRange,
        payload.notes
      ]
    );

    res.status(201).json({ data: rows[0] });
  } catch (error) {
    next(error);
  }
});
