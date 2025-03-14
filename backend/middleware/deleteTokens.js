export const deleteTokens = async (req, res, next) => {
  res.clearCookie("token");
  res.clearCookie("refreshToken");
  next();
};
