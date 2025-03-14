import { createError } from "../utils/createError.js";

const accessForVerified = async (req, res, next) => {
  const user = await req?.user;

  if (!user) {
    return next(
      createError({ error: null, message: "Unauthorized", statusCode: 401 })
    );
  }

  if (!user.isVerified) {
    return next(
      createError({
        message: "Forbidden, You Should Be Verified First",
        statusCode: 403,
      })
    );
  }
  next();
};
export { accessForVerified };
