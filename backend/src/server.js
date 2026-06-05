// Purpose: Boots the API by connecting to MongoDB, initializing PostgreSQL
// tables, seeding MongoDB when empty, and starting the HTTP server.
import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { connectMongo } from "./db/mongo.js";
import { initializePostgres } from "./db/postgres.js";
import { Destination } from "./models/Destination.js";
import { Experience } from "./models/Experience.js";
import { Story } from "./models/Story.js";
import { destinations, experiences, stories } from "./data/seedData.js";

async function seedMongoIfEmpty() {
  const destinationCount = await Destination.countDocuments();

  if (destinationCount > 0) {
    return;
  }

  await Destination.insertMany(destinations);
  await Experience.insertMany(experiences);
  await Story.insertMany(stories);
  console.log("MongoDB seeded with default tourism content.");
}

async function startServer() {
  await connectMongo();
  await initializePostgres();
  await seedMongoIfEmpty();

  const app = createApp();

  app.listen(env.port, () => {
    console.log(`Mzansi tourism API running on port ${env.port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start API:", error);
  process.exit(1);
});
