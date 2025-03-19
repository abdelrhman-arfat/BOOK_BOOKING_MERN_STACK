export const deleteTokens = async (req, res, next) => {
  res.clearCookie("token", {
    sameSite: "None",
    secure: true,
    httpOnly: true,
  });
  res.clearCookie("refreshToken", {
    sameSite: "None",
    secure: true,
    httpOnly: true,
  });
  next();
};
