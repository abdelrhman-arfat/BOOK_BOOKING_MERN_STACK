import mongoose from "mongoose";
import validator from "validator";
import { userRoles } from "../utils/userRole.js";
const userSchema = new mongoose.Schema({
  firstName: {
    minlength: 2,
    type: String,
    required: true,
  },
  lastName: {
    minlength: 2,
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Email is required",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    enum: [
      userRoles.ADMIN,
      userRoles.USER,
      userRoles.SUPERADMIN,
      userRoles.LEADER,
    ],
    default: userRoles.USER,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  profilePicture: {
    type: String,
    default:
      "https://res.cloudinary.com/dannuv9wj/image/upload/v1741880998/vzwbk2akc3gbwcu9wrws.jpg",
  },
});

export const User =
  mongoose.models.users || mongoose.model("users", userSchema);
