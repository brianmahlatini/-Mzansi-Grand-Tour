// Purpose: Seeds MongoDB with default destination, experience, and story content
// so demos and fresh developer environments have production-like data.
import { connectMongo } from "../db/mongo.js";
import { initializePostgres } from "../db/postgres.js";
import { Destination } from "../models/Destination.js";
import { Experience } from "../models/Experience.js";
import { Story } from "../models/Story.js";
import { destinations, experiences, stories } from "../data/seedData.js";

async function seed() {
  await connectMongo();
  await initializePostgres();

  await Destination.deleteMany({});
  await Experience.deleteMany({});
  await Story.deleteMany({});

  await Destination.insertMany(destinations);
  await Experience.insertMany(experiences);
  await Story.insertMany(stories);

  console.log("Seeded South Africa tourism content.");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
