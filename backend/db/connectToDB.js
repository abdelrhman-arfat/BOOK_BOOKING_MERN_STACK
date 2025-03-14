import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
export const connectToDB = async function () {
  try {
    // eslint-disable-next-line no-undef
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};
