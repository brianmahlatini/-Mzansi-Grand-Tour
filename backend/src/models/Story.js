// Purpose: Represents editorial stories that give travelers emotional context
// before they choose a destination or send a planning enquiry.
import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    kicker: { type: String, required: true },
    readTime: { type: String, required: true },
    image: { type: String, required: true },
    excerpt: { type: String, required: true },
    author: { type: String, required: true }
  },
  { timestamps: true }
);

export const Story = mongoose.model("Story", storySchema);
