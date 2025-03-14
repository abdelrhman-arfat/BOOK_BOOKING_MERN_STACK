import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
dotenv.config();

const sendVerificationEmail = async (user) => {
  const token = await jwt.sign(
    { userId: user._id, role: user.role },
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
    from: `"Book Store" ${process.env.EMAIL_USER}`,
    to: user.email,
    subject: "Verify Your Email",
    html: `<p>Click the link below to verify your email:</p>
          <a href="${verificationLink}">${verificationLink}</a>`,
  });
  
};

export { sendVerificationEmail };
