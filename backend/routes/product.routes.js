import { Router } from "express";
import { asyncWrapper } from "../middleware/asyncWrapper.js";
import {
  getAllProducts,
  AddNewProduct,
} from "../controllers/products.controller.js";
import { upload } from "../config/cloudinaryConfig.js";
import { accessSuperAdminWork } from "../middleware/accessSuperAdminWorks.js";
import { tokenVerify } from "../middleware/tokenVerify.js";

const router = new Router();

router
  .get("/", asyncWrapper(getAllProducts))
  .post(
    "/",
    tokenVerify,
    accessSuperAdminWork,
    upload.single("image"),
    asyncWrapper(AddNewProduct)
  );
// .post("/", () => {})
// .patch("/:product_id", () => {});

export { router as productRouter };
