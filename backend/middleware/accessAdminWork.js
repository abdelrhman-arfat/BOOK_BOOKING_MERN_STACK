import { createError } from "../utils/createError.js";
import { userRoles } from "../utils/userRole.js";

const accessAdminWork = async (req, res, next) => {
  const user = await req?.user;
  if (!user) {
    return next(
      createError({ error: null, message: "Unauthorized", statusCode: 401 })
    );
  }

  if (user.role === userRoles.USER) {
    return next(
      createError({
        message: "Forbidden, you don't have access to this data",
        statusCode: 403,
      })
    );
  }
  next();
};
export { accessAdminWork };
