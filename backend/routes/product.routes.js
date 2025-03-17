import { Router } from "express";
import { asyncWrapper } from "../middleware/asyncWrapper.js";
import {
  getAllProducts,
  AddNewProduct,
  deleteProduct,
  changeProductInfo,
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
  )
  .patch(
    "/:product_id",
    tokenVerify,
    accessSuperAdminWork,
    upload.single("image"),
    asyncWrapper(changeProductInfo)
  )
  .delete(
    "/:product_id",
    tokenVerify,
    accessSuperAdminWork,
    asyncWrapper(deleteProduct)
  );
// .post("/", () => {})
// .patch("/:product_id", () => {});

export { router as productRouter };
