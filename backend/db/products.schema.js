import mongoose from "mongoose";
import validator from "validator";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    author_name: {
      type: String,
      required: true,
    },
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    author_email: {
      type: String,
      required: true,
      validate: {
        validator: validator.isEmail,

        message: "Invalid email format",
      },
    },
  },
  book_url: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: "Invalid URL format",
    },
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const Product =
  mongoose.model.Products || mongoose.model("Products", productSchema);
