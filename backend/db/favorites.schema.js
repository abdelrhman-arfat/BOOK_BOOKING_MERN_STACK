import mongoose from "mongoose";

const favSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  book_id: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const Favorite =
  mongoose.models.favorites || mongoose.model("favorites", favSchema);
