export const ErrorHandler = (error, req, res, next) => {
  if (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message,
      data: null,
      code: error.statusCode || 500,
    });
  }

  next();
};
