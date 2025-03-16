export const createError = (error) => {
  return {
    data: null,
    statusCode: error.statusCode || 500,
    message: error.message || "An error occurred, please try again later",
  };
};
