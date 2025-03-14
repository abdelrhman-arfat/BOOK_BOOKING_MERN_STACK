import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";
dotenv.config();
export const tokenVerify = async (req, res, next) => {
  try {
    const token =
      (await req?.cookies?.token) ||
      (await req?.headers?.authorization?.split(" ")[1]) ||
      (await req?.headers?.Authorization?.split(" ")[1]);

    if (!token) {
      return next(
        createError({ statusCode: 401, message: "Invalid token", error: null })
      );
    }
    // eslint-disable-next-line no-undef
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return next(
        createError({ statusCode: 401, message: "Invalid token", error: null })
      );
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    next({ error, message: error.message, statusCode: 400 });
  }
};
