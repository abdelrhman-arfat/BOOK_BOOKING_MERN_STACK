import { Product } from "../db/products.schema.js";
import { createError } from "../utils/createError.js";

const getAllProducts = async (req, res, next) => {
  const { page = 1, limit = 15 } = req.query || req.params;
  const skip = (page - 1) * limit;

  const [products, totalProducts] = await Promise.all([
    Product.find({}).select("-password -__v").limit(limit).skip(skip),
    Product.countDocuments(),
  ]);
  if (!products) {
    return next(
      createError({
        message: "No products found",
        statusCode: 404,
      })
    );
  }

  res.status(200).json({
    success: true,
    data: {
      results: products,
    },
    message: "Product was successfully",
    total: totalProducts,
    currentPage: +page,
    totalPages: Math.ceil(totalProducts / limit),
  });
};

const AddNewProduct = async (req, res, next) => {
  const { title, price, description } = req.body;
  const image = req.file ? req.file.path : null;
  const user = req?.user;
  if (!user) {
    return next(createError({ message: "Unauthorized", statusCode: 401 }));
  }

  const product = await new Product({
    author_id: user._id,
    title,
    price,
    description,
    image,
  });

  if (!product) {
    return next(
      createError({
        message: "Failed to add product",
        statusCode: 500,
      })
    );
  }

  await product.save();

  res.status(201).json({
    success: true,
    data: product,
    message: "Product added successfully",
  });
};

export { getAllProducts, AddNewProduct };
