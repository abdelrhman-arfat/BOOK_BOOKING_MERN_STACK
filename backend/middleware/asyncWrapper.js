export const asyncWrapper = (asyncFUNC) => async (req, res, next) => {
  try {
    await asyncFUNC(req, res, next);
  } catch (error) {
    next(error);
  }
};
