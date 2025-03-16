import { Router } from "express";
import {
  getAllUsers,
  handelChangeRole,
  handleDeleteUser,
  handleLogin,
  handleLogOut,
  handleNewUser,
  handleUpdatePhoto,
  refreshToken,
  verificationEmail,
} from "../controllers/user.controller.js";
import { asyncWrapper } from "../middleware/asyncWrapper.js";
import { tokenVerify } from "../middleware/tokenVerify.js";
import { accessAdminWork } from "../middleware/accessAdminWork.js";
import { deleteTokens } from "../middleware/deleteTokens.js";
import { loginValidator } from "../validator/loginValidator.js";
import { upload } from "../config/cloudinaryConfig.js";
import { accessSuperAdminWork } from "../middleware/accessSuperAdminWorks.js";
import { accessForVerified } from "../middleware/IfVerified.js";
import { sendVerificationEmailWhenOrder } from "../func/sendVerificationWithOrder.js";

const router = new Router();

router
  .get(
    "/",
    tokenVerify,
    accessAdminWork,
    accessForVerified,
    asyncWrapper(getAllUsers)
  )
  .patch("/verify-email", asyncWrapper(verificationEmail))
  .post("/register", asyncWrapper(handleNewUser))
  .post("/login", loginValidator, asyncWrapper(handleLogin))
  .post("/logout", tokenVerify, deleteTokens, asyncWrapper(handleLogOut))
  .post("/refresh", asyncWrapper(refreshToken))
  .post(
    "/:user_id",
    tokenVerify,
    accessForVerified,
    accessSuperAdminWork,
    asyncWrapper(handelChangeRole)
  )
  .put(
    "/update-photo/:user_id",
    tokenVerify,

    upload.single("image"),
    asyncWrapper(handleUpdatePhoto)
  )
  .post(
    "/send-verification-email/:user_id",
    asyncWrapper(sendVerificationEmailWhenOrder)
  );

router.delete(
  "/:user_id",
  tokenVerify,
  asyncWrapper(handleDeleteUser),
  deleteTokens
);

export { router as userRouter };
