import { Favorite } from "../db/favorites.schema.js";
import { createError } from "../utils/createError.js";

const getAllFavorites = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(
      createError({
        error: null,
        message: "Unauthorized",
        statusCode: 401,
      })
    );
  }

  const favoritesData = await Favorite.find({ user_id: user._id });

  if (!favoritesData) {
    return next(
      createError({
        error: null,
        message: "No favorite found",
        statusCode: 404,
      })
    );
  }

  res.status(200).json({
    message: "favorites fetched successfully",
    data: {
      results: favoritesData,
    },
    error: null,
  });
};

const addToFav = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(createError({ message: "Unauthorized", statusCode: 401 }));
  }

  const book_id = req.params.book_id || req.query.book_id;

  if (!book_id) {
    return next(
      createError({ message: "Book id not provided", statusCode: 400 })
    );
  }

  const favorite = await Favorite.findOne({ user_id: user._id, book_id });

  // if the book already in favorite:

  if (favorite) {
    await favorite.deleteOne();

    return res
      .status(200)
      .json({ message: "Book removed from favorites", data: null });
  }

  const newFavorite = new Favorite({ user_id: user._id, book_id });
  await newFavorite.save();

  res.status(200).json({ message: "Book added to favorites", data: null });
};


export { getAllFavorites, addToFav };
