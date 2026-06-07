// Purpose: Provides an enterprise tourism chatbot endpoint that uses OpenAI on
// the server side when configured and falls back to safe local help otherwise.
import express from "express";
import OpenAI from "openai";
import { z } from "zod";
import { env } from "../config/env.js";
import { pool } from "../db/postgres.js";
import { Destination } from "../models/Destination.js";
import { Experience } from "../models/Experience.js";

export const chatRouter = express.Router();

const chatSchema = z.object({
  message: z.string().min(2).max(1200),
  context: z.object({
    path: z.string().max(200).optional(),
    role: z.string().max(40).optional()
  }).optional()
});

function localFallback(message) {
  const lower = message.toLowerCase();

  if (lower.includes("admin")) {
    return "Admins can register as the first account, then use /admin to see metrics, users, leads, bookings, and manage booking statuses.";
  }

  if (lower.includes("booking") || lower.includes("cancel")) {
    return "To create a booking, register or login, then visit /plan. Users can cancel their own bookings from /account. Admins can manage all bookings from /admin/bookings.";
  }

  if (lower.includes("mongo")) {
    return "MongoDB stores flexible tourism content: destinations, experiences, and stories. PostgreSQL stores users, leads, bookings, packages, and audit events.";
  }

  return "I can help with South Africa destinations, journeys, experiences, bookings, cancellations, admin access, user dashboards, MongoDB content, and PostgreSQL booking data. Ask me what you want to do next.";
}

function hasUsableOpenAiKey() {
  return Boolean(env.openai.apiKey && !env.openai.apiKey.startsWith("replace-with-"));
}

async function buildPlatformContext() {
  const [destinations, experiences, packages] = await Promise.all([
    Destination.find().select("name province tagline bestFor season").lean().limit(8),
    Experience.find().select("title category region duration summary").lean().limit(8),
    pool.query("SELECT title, region, duration_days, price_from_usd FROM packages ORDER BY price_from_usd ASC")
  ]);

  return {
    destinations,
    experiences,
    packages: packages.rows,
    platformRoutes: ["/auth", "/account", "/admin", "/admin/bookings", "/destinations", "/journeys", "/experiences", "/stories", "/plan"],
    roleRules: "First registered user becomes ADMIN. Later users become USER. Booking creation requires login."
  };
}

chatRouter.post("/chat", async (req, res, next) => {
  try {
    const payload = chatSchema.parse(req.body);
    const platformContext = await buildPlatformContext();

    if (!hasUsableOpenAiKey()) {
      return res.json({
        data: {
          answer: localFallback(payload.message),
          mode: "local-fallback"
        }
      });
    }

    const client = new OpenAI({ apiKey: env.openai.apiKey });
    const response = await client.responses
      .create({
        model: env.openai.chatModel,
        input: [
          {
            role: "system",
            content:
              "You are Mzansi Concierge, the enterprise AI assistant for a South Africa tourism platform. Answer clearly, help users plan trips, explain destinations, guide bookings and cancellations, explain admin/user features, and never expose secrets or invent unavailable features. Keep answers concise and action-oriented."
          },
          {
            role: "user",
            content: JSON.stringify({
              userQuestion: payload.message,
              pageContext: payload.context || {},
              platformContext
            })
          }
        ]
      })
      .catch((error) => {
        console.warn("OpenAI chatbot fallback:", error.code || error.message);
        return null;
      });

    return res.json({
      data: {
        answer: response?.output_text || localFallback(payload.message),
        mode: response?.output_text ? "openai" : "local-fallback"
      }
    });
  } catch (error) {
    return next(error);
  }
});
