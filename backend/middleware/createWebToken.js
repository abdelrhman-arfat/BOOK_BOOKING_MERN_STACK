import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../utils/createError.js";

dotenv.config();

export const createAccessToken = async (userInfo, next) => {
  try {
    if (!userInfo) {
      return next(
        createError({
          message: "No user information provided",
          statusCode: 400,
        })
      );
    }

    // eslint-disable-next-line no-undef
    const token = await jwt.sign(userInfo, process.env.JWT_SECRET, {
      expiresIn: "20m",
    });

    return token;
  } catch (error) {
    return next(
      createError({
        error,
        message: "Failed to create access token",
        statusCode: 401,
      })
    );
  }
};

export const createRefreshToken = async (userInfo, next) => {
  try {
    if (!userInfo) {
      return next(
        createError({
          message: "No user information provided",
          statusCode: 400,
        })
      );
    }

    const refreshToken = await jwt.sign(
      userInfo,
      // eslint-disable-next-line no-undef
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return refreshToken;
  } catch (error) {
    return next(
      createError({
        error,
        message: "Failed to create refresh token",
        statusCode: 400,
      })
    );
  }
};
