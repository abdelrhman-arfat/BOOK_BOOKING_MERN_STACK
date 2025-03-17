export const deleteTokens = async (req, res, next) => {
  res.clearCookie("token", { sameSite: "None", secure: true });
  res.clearCookie("refreshToken", { sameSite: "None", secure: true });
  next();
};
