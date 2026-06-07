# Mzansi Grand Tour

Mzansi Grand Tour is a full-stack South Africa tourism platform with a React + TypeScript frontend, Node/Express backend, PostgreSQL transactional storage, MongoDB content storage, authentication, role-based dashboards, real destination media, and Docker Compose orchestration.

The first registered account automatically becomes `ADMIN`. Every later registration becomes a `USER`.

## Features

- Public tourism website with real South Africa photos, videos, destinations, journeys, experiences, stories, and lead capture.
- Authentication with username, email, and password.
- First registered user becomes admin automatically.
- JWT-protected API routes.
- Admin dashboard for platform metrics, users, leads, bookings, booking status management, and audit visibility.
- User dashboard for owned bookings, next-trip visibility, and booking cancellation.
- PostgreSQL stores users, leads, bookings, packages, and audit events.
- MongoDB stores flexible content: destinations, experiences, and stories.
- React Router routes for public pages, auth, admin, and user account areas.
- TypeScript frontend models and typed API helpers.
- Dockerized frontend, backend, PostgreSQL, and MongoDB.

## Run With Docker

```bash
docker compose up --build
```

Open:

- Frontend: `http://localhost:5173`
- Backend health: `http://localhost:5000/api/health`

Run in background:

```bash
docker compose up --build -d
```

Stop:

```bash
docker compose down
```

Clean database volumes:

```bash
docker compose down -v
docker compose up --build
```

## First Login Flow

1. Open `http://localhost:5173/auth`.
2. Register with username, email, and password.
3. If this is the first account in PostgreSQL, it becomes `ADMIN`.
4. Later registrations become `USER`.
5. Admins are sent to `/admin`.
6. Users are sent to `/account`.

## Main Frontend Routes

| Route | Purpose |
|---|---|
| `/` | Public tourism homepage |
| `/auth` | Register/login |
| `/destinations` | Destination listing |
| `/destinations/:slug` | Destination detail |
| `/journeys` | Curated package routes |
| `/experiences` | Experience catalogue |
| `/stories` | Editorial travel stories |
| `/plan` | Booking request form |
| `/admin` | Admin dashboard |
| `/admin/bookings` | Admin booking management |
| `/admin/users` | Admin user overview |
| `/account` | User trip dashboard |

## Backend API

### Public

```text
GET  /api/health
GET  /api/destinations
GET  /api/destinations/:slug
GET  /api/experiences
GET  /api/stories
GET  /api/packages
POST /api/leads
```

### Auth

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

Register body:

```json
{
  "username": "brian",
  "email": "brian@example.com",
  "password": "password123"
}
```

Login body:

```json
{
  "username": "brian",
  "password": "password123"
}
```

or:

```json
{
  "email": "brian@example.com",
  "password": "password123"
}
```

### User Protected

Requires `Authorization: Bearer <token>`.

```text
GET   /api/me/dashboard
GET   /api/me/bookings
PATCH /api/me/bookings/:id/cancel
POST  /api/bookings
```

Cancel body:

```json
{
  "reason": "Travel dates changed"
}
```

### Admin Protected

Requires an admin token.

```text
GET   /api/admin/dashboard
GET   /api/admin/bookings
PATCH /api/admin/bookings/:id/status
GET   /api/admin/leads
GET   /api/admin/users
GET   /api/admin/audit-events
```

Update booking status body:

```json
{
  "status": "confirmed"
}
```

Supported booking statuses:

```text
new, reviewing, confirmed, completed, cancelled
```

## Project Structure

```text
backend/
  src/
    app.js
    server.js
    config/
    data/
    db/
    middleware/
      authMiddleware.js
      errorHandler.js
    models/
    routes/
      adminRoutes.js
      authRoutes.js
      contentRoutes.js
      conversionRoutes.js
      userRoutes.js
    services/
      auditService.js
    scripts/

frontend/
  src/
    App.tsx
    api/
    auth/
    components/
      common/
      dashboard/
      forms/
      layout/
      sections/
    data/
    hooks/
    lib/
    pages/
    types/
```

## Data Storage

### PostgreSQL

Stores structured system and business data:

- `users`
- `leads`
- `bookings`
- `packages`
- `audit_events`

### MongoDB

Stores flexible tourism content:

- `destinations`
- `experiences`
- `stories`

## Local Commands

Frontend:

```bash
cd frontend
npm install
npm run typecheck
npm run build
npm run dev
```

Backend:

```bash
cd backend
npm install
npm run dev
npm run seed
```

## Verification

Useful checks:

```bash
docker compose ps
docker compose logs --tail=100 backend
docker compose logs --tail=100 frontend
```

Frontend checks:

```bash
cd frontend
npm run typecheck
npm run build
```

Backend syntax examples:

```bash
node --check backend/src/server.js
node --check backend/src/routes/authRoutes.js
node --check backend/src/routes/adminRoutes.js
```

## Environment

Backend environment variables are documented in `backend/.env.example`.

Important values:

```text
POSTGRES_HOST
POSTGRES_PORT
POSTGRES_DB
POSTGRES_USER
POSTGRES_PASSWORD
MONGO_URI
CORS_ORIGIN
JWT_SECRET
JWT_EXPIRES_IN
```

Use a strong `JWT_SECRET` outside local development.

## Production Notes

Before production, add TLS, strong secret management, rate limiting, refresh tokens, audit retention policies, provider-owned media/CDN hosting, backups, monitoring, CI/CD, and hardened database credentials.
