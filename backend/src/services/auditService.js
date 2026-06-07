// Purpose: Records important user and admin actions for operational visibility
// in the admin dashboard.
import { pool } from "../db/postgres.js";

export async function recordAuditEvent({ userId, action, entityType, entityId = null, metadata = {} }) {
  await pool.query(
    `INSERT INTO audit_events (user_id, action, entity_type, entity_id, metadata)
     VALUES ($1, $2, $3, $4, $5)`,
    [userId || null, action, entityType, entityId, metadata]
  );
}
