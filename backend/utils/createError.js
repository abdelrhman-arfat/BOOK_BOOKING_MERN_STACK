export const createError = (error) => {
  return {
    statusCode: error.statusCode,
    message: error.message,
  };
};
