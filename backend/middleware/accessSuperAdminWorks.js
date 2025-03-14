import { createError } from "../utils/createError.js";
import { userRoles } from "../utils/userRole.js";

const accessSuperAdminWork = async (req, res, next) => {
  const user = req?.user;
  if (!user) {
    return next(
      createError({ error: null, message: "Unauthorized", statusCode: 401 })
    );
  }

  if (![userRoles.SUPERADMIN, userRoles.LEADER].includes(user.role)) {
    return next(
      createError({
        message: "Forbidden, you don't have access to this data",
        statusCode: 403,
      })
    );
  }
  next();
};
export { accessSuperAdminWork };
