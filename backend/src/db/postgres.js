// Purpose: Owns the PostgreSQL connection pool and creates transactional tables
// for leads, bookings, and curated itinerary packages when the API starts.
import pg from "pg";
import { env } from "../config/env.js";

const { Pool } = pg;

export const pool = new Pool({
  ...env.postgres,
  max: 10,
  idleTimeoutMillis: 30000
});

export async function initializePostgres() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(120) NOT NULL,
      email VARCHAR(160) NOT NULL,
      travel_style VARCHAR(80) NOT NULL,
      dream_trip TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(120) NOT NULL,
      email VARCHAR(160) NOT NULL,
      destination VARCHAR(120) NOT NULL,
      guests INTEGER NOT NULL CHECK (guests > 0),
      arrival_date DATE NOT NULL,
      budget_range VARCHAR(80) NOT NULL,
      notes TEXT,
      status VARCHAR(40) DEFAULT 'new',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS packages (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(120) UNIQUE NOT NULL,
      title VARCHAR(160) NOT NULL,
      region VARCHAR(120) NOT NULL,
      duration_days INTEGER NOT NULL,
      price_from_usd INTEGER NOT NULL,
      highlights TEXT[] NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  await pool.query(`
    INSERT INTO packages (slug, title, region, duration_days, price_from_usd, highlights)
    VALUES
      (
        'cape-safari-wine',
        'Cape, Safari & Wine Signature Journey',
        'Western Cape + Greater Kruger',
        10,
        3850,
        ARRAY['Table Mountain at sunrise', 'Private Big Five safari', 'Franschhoek wine tram', 'Cape Peninsula coastal drive']
      ),
      (
        'garden-route-blueprint',
        'Garden Route Ocean Blueprint',
        'Western Cape + Eastern Cape',
        8,
        2450,
        ARRAY['Whale watching', 'Knysna lagoon cruise', 'Tsitsikamma canopy walk', 'Addo elephant encounter']
      ),
      (
        'joburg-culture-kruger',
        'Jozi Culture to Kruger Wilderness',
        'Gauteng + Mpumalanga',
        7,
        2200,
        ARRAY['Soweto storytelling', 'Panorama Route', 'Luxury tented camp', 'Sunset game drive']
      )
    ON CONFLICT (slug) DO NOTHING;
  `);
}
