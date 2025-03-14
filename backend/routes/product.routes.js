import { Router } from "express";

const router = new Router();

router
  .get("/", () => {})
  .post("/", () => {})
  .patch("/:product_id", () => {});

export { router as productRouter };
