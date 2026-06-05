// Purpose: Stores flexible tourism experiences that can be filtered by category
// and assembled into premium itineraries.
import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    region: { type: String, required: true },
    duration: { type: String, required: true },
    intensity: { type: String, required: true },
    image: { type: String, required: true },
    summary: { type: String, required: true },
    inclusions: [{ type: String, required: true }]
  },
  { timestamps: true }
);

export const Experience = mongoose.model("Experience", experienceSchema);
