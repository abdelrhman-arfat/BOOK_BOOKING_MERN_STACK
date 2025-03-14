import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 2,
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
    min: 1,
    max: 5,
    required: true,
  },
  quantity: {
    type: Number,
    min: 1,
    required: true,
  },
  category: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Category",
    required: true,
  },
});

export const Product =
  mongoose.model.Product || mongoose.model("Product", productSchema);
