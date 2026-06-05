# Tourism Website

Tourism Website is a full-stack destination showcasing platform with rich media content, interactive journey planning, and dynamic story storytelling. It features a React + TypeScript frontend, Express.js backend, PostgreSQL relational data, MongoDB content management, and Docker Compose orchestration.

The goal of this project is to demonstrate senior full-stack engineering fundamentals for content platforms: server-side rendering optimization, content delivery architecture, relational and document persistence patterns, event-driven data synchronization, API-driven component composition, SEO-friendly routing, responsive media handling, and a frontend that separates concerns into pages, reusable components, custom hooks, and typed API helpers.

## Features

- **Public-facing destination showcase** with hero videos, destination galleries, and interactive experiences
- **SEO-optimized routing** with clean URLs for destinations, experiences, journeys, and stories
- **Rich media support** including smart image optimization, hero videos, and gallery sections
- **Responsive layout** with dedicated navigation, footer, and layout components
- **Journey planning interface** for curated travel packages and experiences
- **Story-driven content** showcasing traveler narratives and destination highlights
- **Lead capture forms** for email collection and planning inquiries
- **Trust signals section** with social proof and testimonials
- **API-driven content** pulling destinations, experiences, packages, and stories from backend
- **TypeScript type safety** ensuring frontend-backend contract validation
- **PostgreSQL** for relational booking, journey, and transaction data
- **MongoDB** for flexible content management of destinations, stories, and experiences
- **Express.js backend** with modular route handlers and middleware pipeline
- **Docker Compose** orchestration for full local stack reproduction
- **Nginx frontend serving** with SPA fallback routing and API proxy configuration

## Architecture

```
React + TypeScript Frontend (Vite)
        |
        |  HTTP API calls
        v
Express.js Backend
        |
        +----------------+----------------+
        |                |                |
        v                v                v
PostgreSQL          MongoDB         Kafka
Bookings            Destinations    Content Events
Transactions        Experiences     Sync Pipeline
Journeys            Stories
        |
        v
Media Server
Video streaming
Image optimization
```

## Project Structure

```
TOURISM-WEBSITE/
  backend/
    Dockerfile                              Container build for Express API
    package.json                            Node dependencies
    src/
      app.js                               Express app setup and middleware
      server.js                            HTTP server entry point
      config/
        env.js                             Environment configuration
      data/
        seedData.js                        Database seeding data
      db/
        mongo.js                           MongoDB connection
        postgres.js                        PostgreSQL connection
      middleware/
        errorHandler.js                    Global error handling
      models/
        Destination.js                     Destination schema and queries
        Experience.js                      Experience schema and queries
        Story.js                          Story schema and queries
      routes/
        contentRoutes.js                   Destinations, experiences, stories APIs
        conversionRoutes.js                Bookings and inquiry APIs
      scripts/
        seed.js                            Database initialization script

  frontend/
    Dockerfile                             Builds React app and serves with Nginx
    index.html                             HTML entry point
    package.json                           React dependencies and scripts
    tsconfig.json                          Strict TypeScript configuration
    vite.config.ts                         Vite dev server and build config
    src/
      main.tsx                             React bootstrap
      App.tsx                              Route definitions
      styles.css                           Global styling
      vite-env.d.ts                        Vite environment types
      api/
        tourismApi.ts                      Typed HTTP helper and API client
      components/
        common/
          HeroVideo.tsx                    Video playback component
          SmartImage.tsx                   Optimized image component
        forms/
          LeadCapture.tsx                  Email signup form
          PlanningForm.tsx                 Journey planning form
        layout/
          NavBar.tsx                       Navigation header
          navigation.ts                    Route definitions
          PublicLayout.tsx                 Layout wrapper for public routes
          SiteFooter.tsx                   Footer component
        sections/
          DestinationsSection.tsx          Featured destinations showcase
          ExperiencesSection.tsx           Experiences gallery
          GallerySection.tsx               Photo gallery display
          HeroSection.tsx                  Hero banner with media
          JourneysSection.tsx              Journey packages showcase
          PlanSection.tsx                  Planning call-to-action
          StoriesSection.tsx               Travel stories showcase
          TrustSection.tsx                 Testimonials and social proof
          VideoShowcaseSection.tsx         Video carousel
      data/
        fallbackData.ts                    Default content fallback
        media.ts                           Media URLs and metadata
      hooks/
        useTourismData.ts                  Custom hook for fetching tourism content
      lib/
        format.ts                          Formatting utilities
      pages/
        DestinationDetailPage.tsx          Individual destination page
        DestinationsPage.tsx               Destinations listing page
        ExperiencesPage.tsx                Experiences listing page
        HomePage.tsx                       Landing page
        JourneysPage.tsx                   Journey packages page
        NotFoundPage.tsx                   404 error page
        PageHero.tsx                       Hero template for pages
        PlanPage.tsx                       Planning inquiry page
        StoriesPage.tsx                    Stories listing page
      types/
        tourism.ts                         Shared TypeScript models

  docker-compose.yml                       Full local stack orchestration
  README.md                                Project documentation
```

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- React Router v6
- Lucide React icons
- CSS Grid and Flexbox
- Nginx container for serving

### Backend
- Node.js (v20+)
- Express.js
- PostgreSQL JDBC driver
- MongoDB ODM (Mongoose)
- CORS and Helmet security
- Morgan request logging
- Zod schema validation

### Infrastructure
- PostgreSQL 16
- MongoDB 8
- Docker
- Docker Compose
- Nginx

## API Routes

### Content APIs (Public)
```
GET  /api/destinations              List all destinations
GET  /api/destinations/:id          Get destination details
GET  /api/experiences               List all experiences
GET  /api/experiences/:id           Get experience details
GET  /api/journeys                  List journey packages
GET  /api/stories                   List travel stories
GET  /api/stories/:id               Get story details
```

### Conversion APIs
```
POST /api/bookings                  Create new booking
POST /api/inquiries                 Submit planning inquiry
GET  /api/health                    Health check
```

## Run With Docker

Start the full stack:

```bash
docker compose up --build
```

Run in the background:

```bash
docker compose up --build -d
```

Access:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8080
- **Health**: http://localhost:8080/api/health

Check containers:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs --tail=100 backend
docker compose logs --tail=100 frontend
```

Stop containers:

```bash
docker compose down
```

Fresh start with clean volumes:

```bash
docker compose down -v
docker compose up --build
```

## Local Frontend Commands

To work on the React app outside Docker:

```bash
cd frontend
npm install
npm run build
npm run dev
```

## Local Backend Commands

If infrastructure is already running through Docker:

```bash
cd backend
npm install
npm run dev
```

Required local services:
- PostgreSQL on localhost:5432
- MongoDB on localhost:27017

## Main Pages

| Route | Purpose |
|-------|---------|
| `/` | Landing page with hero and featured sections |
| `/destinations` | Destination listing and search |
| `/destinations/:slug` | Individual destination detail page |
| `/journeys` | Journey packages and curated trips |
| `/experiences` | Experiences and activities listing |
| `/stories` | Travel stories and narratives |
| `/plan` | Planning inquiry and contact form |

## Data Storage

### PostgreSQL
Stores relational booking and transaction data:

```
bookings
  id
  destination_id
  user_email
  travel_dates
  party_size
  status
  created_at

inquiries
  id
  name
  email
  destination_interest
  travel_dates
  message
  created_at
```

### MongoDB
Stores flexible content data:

```
destinations
  _id
  name
  slug
  description
  images
  activities
  climate
  best_season
  featured

experiences
  _id
  title
  description
  category
  duration
  price
  images
  location

stories
  _id
  title
  author
  content
  images
  featured_image
  published_date
```

## Environment Configuration

Docker Compose provides defaults for local development:

```
PostgreSQL:  postgres:5432
MongoDB:     mongo:27017
Backend:     backend:8080
Frontend:    frontend:3000
```

Important environment variables:

```
DATABASE_URL           PostgreSQL connection string
MONGO_URI              MongoDB connection URI
API_BASE_URL           Backend API endpoint
NODE_ENV               Development/production
CORS_ORIGIN            Allowed frontend origin
```

Use secure configurations outside local development.

## Verification

The stack was verified with:

```bash
npm run build --prefix frontend
npm run dev --prefix backend &
docker compose up --build -d
docker compose ps
curl http://localhost:3000/
curl http://localhost:8080/api/health
```

Expected results:
- React production build succeeds
- Express.js backend starts on port 8080
- PostgreSQL starts and passes health check
- MongoDB starts and passes health check
- Frontend returns 200 OK
- Backend health endpoint returns 200 OK

## Senior Engineering Signals

- Separate frontend and backend repositories with clear API contracts
- Docker Compose reproduces the full local environment deterministically
- PostgreSQL provides ACID guarantees for critical booking data
- MongoDB provides flexible schema for rich content management
- Express.js middleware pipeline handles cross-cutting concerns
- TypeScript ensures type safety across frontend-backend boundaries
- React custom hooks encapsulate data fetching logic
- Reusable components separate presentation from content
- Responsive design handles mobile, tablet, and desktop viewports
- SEO-friendly routing with clean URLs and semantic HTML
- Media optimization includes smart image serving and video lazy loading
- Error handling includes global middleware and fallback UI states
- Content seeding enables reproducible local development
- Environment configuration separates concerns from code
- Dockerized services enable platform-independent deployment
- Nginx serves frontend with SPA fallback and API proxy routing

## Notes

This is a portfolio-grade local development system, not a hardened production deployment.

Real production deployments should add:
- TLS/SSL everywhere
- Centralized secret management (Vault, AWS Secrets Manager)
- CDN for static assets and media
- Caching layer (Redis, CloudFront)
- Rate limiting and DDoS protection
- Database connection pooling and replication
- Backup and disaster recovery
- Structured logging and distributed tracing
- APM monitoring and error tracking
- CI/CD pipeline with automated testing
- Container image scanning and security scanning
- Database encryption at rest and in transit
- API authentication and authorization
- Production-grade database configurations
- Load balancing and auto-scaling
- Analytics and user behavior tracking
- Search optimization (Elasticsearch)
- Media CDN with multiple edge locations

---

**Author**: Full-Stack Tourism Platform
**Tech Stack**: React • TypeScript • Node.js • Express • PostgreSQL • MongoDB • Docker
**Local Dev Ready**: ✓ Docker Compose • ✓ Full Stack Reproducibility • ✓ Type Safety
