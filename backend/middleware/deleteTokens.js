export const deleteTokens = async (req, res, next) => {
  res.clearCookie("token", {
    sameSite: "Lax",
    secure: true,
    httpOnly: true,
  });
  res.clearCookie("refreshToken", {
    sameSite: "Lax",
    secure: true,
    httpOnly: true,
  });
  next();
};
