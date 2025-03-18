export const deleteTokens = async (req, res, next) => {
  res.clearCookie("token", {
    sameSite: "Strict",
    secure: true,
    httpOnly: true,
  });
  res.clearCookie("refreshToken", {
    sameSite: "Strict",
    secure: true,
    httpOnly: true,
  });
  next();
};
