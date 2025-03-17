import { Router } from "express";
import {
  addToFav,
  getAllFavorites,
} from "../controllers/favorites.controller.js";
import { tokenVerify } from "../middleware/tokenVerify.js";
import { asyncWrapper } from "../middleware/asyncWrapper.js";

const router = new Router();

router
  .get("/", tokenVerify, asyncWrapper(getAllFavorites))
  .post("/:book_id", tokenVerify, asyncWrapper(addToFav));

export { router as favRouter };
