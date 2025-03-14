import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

// -------------------------------- Configuration ----------------------------------------------------

cloudinary.config({
  // eslint-disable-next-line no-undef
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  // eslint-disable-next-line no-undef
  api_key: process.env.CLOUDINARY_API_KEY,
  // eslint-disable-next-line no-undef
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
// -------------------------------- Configuration ----------------------------------------------------

// -------------------------------- Multer storage configuration -------------------------------------
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads",
    transformation: [{ width: 200, height: 200, crop: "fill" }],
  },
});
// -------------------------------- Multer storage configuration -------------------------------------

const upload = multer({ storage });

export { upload, cloudinary };
