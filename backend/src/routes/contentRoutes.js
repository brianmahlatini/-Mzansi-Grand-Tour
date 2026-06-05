// Purpose: Exposes read-only tourism content endpoints backed by MongoDB and
// PostgreSQL package data for the frontend experience.
import express from "express";
import { Destination } from "../models/Destination.js";
import { Experience } from "../models/Experience.js";
import { Story } from "../models/Story.js";
import { pool } from "../db/postgres.js";

export const contentRouter = express.Router();

contentRouter.get("/destinations", async (_req, res, next) => {
  try {
    const destinations = await Destination.find().sort({ name: 1 });
    res.json({ data: destinations });
  } catch (error) {
    next(error);
  }
});

contentRouter.get("/destinations/:slug", async (req, res, next) => {
  try {
    const destination = await Destination.findOne({ slug: req.params.slug });

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    return res.json({ data: destination });
  } catch (error) {
    return next(error);
  }
});

contentRouter.get("/experiences", async (req, res, next) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const experiences = await Experience.find(filter).sort({ category: 1, title: 1 });
    res.json({ data: experiences });
  } catch (error) {
    next(error);
  }
});

contentRouter.get("/stories", async (_req, res, next) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json({ data: stories });
  } catch (error) {
    next(error);
  }
});

contentRouter.get("/packages", async (_req, res, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, slug, title, region, duration_days, price_from_usd, highlights FROM packages ORDER BY price_from_usd ASC"
    );
    res.json({ data: rows });
  } catch (error) {
    next(error);
  }
});
