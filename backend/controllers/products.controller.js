import { Product } from "../db/products.schema.js";
import { createError } from "../utils/createError.js";
import { ObjectId } from "mongodb";

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
  const { book_url, title, price, description, quantity } = req.body;
  const image = req.file ? req.file.path : null;
  const user = req?.user;
  if (!user) {
    return next(createError({ message: "Unauthorized", statusCode: 401 }));
  }

  const product = await new Product({
    author: {
      author_id: user._id,
      author_name: `${user.firstName} ${user.lastName}`,
      author_email: user.email,
    },
    title,
    price,
    description,
    image,
    book_url,
    quantity: quantity <= 0 ? 1 : quantity || 1,
  });

  await product.save();

  if (!product) {
    return next(
      createError({
        message: "Failed to add product",
        statusCode: 500,
      })
    );
  }

  res.status(201).json({
    success: true,
    data: product,
    message: "Product added successfully",
  });
};

const deleteProduct = async (req, res, next) => {
  const { product_id } = req.params || req.query;

  if (!product_id) {
    return next(
      createError({ message: "Product id not provided", statusCode: 400 })
    );
  }

  const product = await Product.findByIdAndDelete(product_id);

  if (!product) {
    return next(createError({ message: "Product not found", statusCode: 404 }));
  }

  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully" });
};

const changeProductInfo = async (req, res, next) => {
  const { product_id } = req.params || req.query;
  if (!product_id || !ObjectId.isValid(product_id)) {
    return next(
      createError({ message: "Product id not provided", statusCode: 400 })
    );
  }

  console.log(1);

  console.log(2);
  const product = await Product.findById(product_id);
  console.log(3);

  if (!product) {
    return next(createError({ message: "Product not found", statusCode: 404 }));
  }
  if (req.body.title) product.title = req.body.title;
  if (req.body.price) product.price = req.body.price;
  if (req.body.description) product.description = req.body.description;
  if (req.body.quantity) product.quantity = req.body.quantity;
  if (req.body.book_url) product.book_url = req.body.book_url;

  if (req.file?.path) {
    product.image = req.file.path;
  } else if (req.body.image) {
    product.image = req.body.image;
  }

  await product.save();

  console.log(6);

  res.status(200).json({
    success: true,
    data: {
      results: product,
    },
    message: "Product updated successfully",
  });
};

export { getAllProducts, deleteProduct, changeProductInfo, AddNewProduct };
