// Purpose: Owns the PostgreSQL connection pool and creates auth, booking,
// lead, package, and audit tables when the API starts.
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
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(80) UNIQUE NOT NULL,
      email VARCHAR(160) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role VARCHAR(20) NOT NULL CHECK (role IN ('ADMIN', 'USER')),
      status VARCHAR(30) DEFAULT 'active',
      last_login_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      full_name VARCHAR(120) NOT NULL,
      email VARCHAR(160) NOT NULL,
      travel_style VARCHAR(80) NOT NULL,
      dream_trip TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      full_name VARCHAR(120) NOT NULL,
      email VARCHAR(160) NOT NULL,
      destination VARCHAR(120) NOT NULL,
      guests INTEGER NOT NULL CHECK (guests > 0),
      arrival_date DATE NOT NULL,
      budget_range VARCHAR(80) NOT NULL,
      notes TEXT,
      status VARCHAR(40) DEFAULT 'new',
      cancellation_reason TEXT,
      cancelled_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    ALTER TABLE leads ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE SET NULL;
    ALTER TABLE bookings ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE SET NULL;
    ALTER TABLE bookings ADD COLUMN IF NOT EXISTS cancellation_reason TEXT;
    ALTER TABLE bookings ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMPTZ;

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

    CREATE TABLE IF NOT EXISTS audit_events (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      action VARCHAR(120) NOT NULL,
      entity_type VARCHAR(80) NOT NULL,
      entity_id VARCHAR(80),
      metadata JSONB DEFAULT '{}'::jsonb,
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
