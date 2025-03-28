import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { createError } from "../utils/createError.js";
import { User } from "../db/user.schema.js";
dotenv.config();

const sendVerificationEmailWhenOrder = async (req, res, next) => {
  const id = req.params.user_id || req.query.user_id;

  if (!id) {
    return next(
      createError({ message: "User ID not provided", statusCode: 400 })
    );
  }
  const user = await User.findById(id).select("-password -__v  ");

  if (!user) {
    return next(createError({ message: "User not found", statusCode: 404 }));
  }

  const token = await jwt.sign(
    user,
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      // eslint-disable-next-line no-undef
      user: process.env.EMAIL_USER, // Your email
      // eslint-disable-next-line no-undef
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  // eslint-disable-next-line no-undef
  const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  transporter.sendMail({
    // eslint-disable-next-line no-undef
    from: `"Book Store" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: "Verify Your Email",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9; text-align: center;">
        <h2 style="color: #333;">Welcome to Book Store! 📚</h2>
        <p style="font-size: 16px; color: #555;">Click the button below to verify your email and activate your account.</p>
        <a href="${verificationLink}" style="display: inline-block; padding: 12px 20px; margin: 10px 0; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Verify Email</a>
        <p style="font-size: 14px; color: #888;">If the button doesn't work, you can also use this link:</p>
        <p><a href="${verificationLink}" style="word-break: break-all; color: #007bff;">${verificationLink}</a></p>
        <p style="font-size: 12px; color: #aaa;">If you didn’t create an account, please ignore this email.</p>
      </div>
    `,
  });

  res.status(200).json({
    message: "Verification email sent successfully",
  });
};

export { sendVerificationEmailWhenOrder };
