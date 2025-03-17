import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

dotenv.config();

const sendVerificationEmailWhenSign = async (user) => {
  const userResponse = user._doc ? { ...user._doc } : { ...user };

  delete userResponse.password;
  delete userResponse.__v;

  const token = await jwt.sign(
    userResponse,
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const transporter = await nodemailer.createTransport({
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

  await transporter.sendMail({
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
};

export { sendVerificationEmailWhenSign };
