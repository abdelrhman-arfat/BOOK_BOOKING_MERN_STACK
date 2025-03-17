import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./db/connectToDB.js";
import { ErrorHandler } from "./middleware/ErrorHandler.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { productRouter } from "./routes/product.routes.js";
import { userRouter } from "./routes/users.routes.js";
import { favRouter } from "./routes/fav.routes.js";

dotenv.config();

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  cors({
    // eslint-disable-next-line no-undef
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

// ------------------------------------------- DB_connection ----------------------------------------
(async function () {
  try {
    await connectToDB();
  } catch {
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
})();
// ------------------------------------------- DB_connection ----------------------------------------

// ------------------------------------------- endpoints ----------------------------------------

// 1 - users
app.use("/api/users", userRouter);

// 2 - products
app.use("/api/products", productRouter);

// // 3 - favorites
app.use("/api/favorites", favRouter);

// ------------------------------------------- endpoints ----------------------------------------

// ------------------------------------------- Errors ----------------------------------------
app.use(ErrorHandler);
app.all("*", (_, res) => {
  res.status(404).json({
    message: "not found",
    success: false,
    data: null,
  });
});
// ------------------------------------------- Errors ----------------------------------------

app.listen(port, () => {
  console.log("server is listening on port" + port);
});
