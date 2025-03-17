import { Router } from "express";
import {
  addToFav,
  getAllFavorites,
} from "../controllers/favorites.controller.js";
import { tokenVerify } from "../middleware/tokenVerify.js";
import { asyncWrapper } from "../middleware/asyncWrapper.js";
import { accessForVerified } from "../middleware/IfVerified.js";

const router = new Router();

router
  .get("/", tokenVerify, asyncWrapper(getAllFavorites))
  .post("/:book_id", tokenVerify , asyncWrapper(accessForVerified), asyncWrapper(addToFav));

export { router as favRouter };
