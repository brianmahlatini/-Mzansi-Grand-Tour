// Purpose: Defines destination documents used by the homepage and destination
// discovery API, including imagery, video, mood, and practical planning details.
import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    province: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    video: { type: String, required: true },
    bestFor: [{ type: String, required: true }],
    signatureMoments: [{ type: String, required: true }],
    coordinates: {
      lat: Number,
      lng: Number
    },
    season: { type: String, required: true }
  },
  { timestamps: true }
);

export const Destination = mongoose.model("Destination", destinationSchema);
