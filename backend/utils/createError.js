export const createError = (error) => {
  return {
    data: null,
    success: false,
    statusCode: error.statusCode || 500,
    message: error.message || "An error occurred, please try again later",
  };
};
