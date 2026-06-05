// Purpose: Connects the API to MongoDB, where flexible editorial tourism content
// can evolve without changing relational database schema.
import mongoose from "mongoose";
import { env } from "../config/env.js";

export async function connectMongo() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(env.mongoUri);
}
