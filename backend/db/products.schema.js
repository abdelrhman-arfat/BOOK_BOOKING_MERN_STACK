import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
    default: 0,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    required: true,
  },
});

export const Product =
  mongoose.model.Product || mongoose.model("Product", productSchema);
