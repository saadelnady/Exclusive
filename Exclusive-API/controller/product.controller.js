const asyncWrapper = require("../middlewares/asyncWrapper");
const Product = require("../models/product.model");
const appError = require("../utils/appError");

const { validationResult } = require("express-validator");
const { productStatus, httpStatusText } = require("../utils/constants.js");

const Seller = require("../models/seller.model");
const mongoose = require("mongoose");

const getProducts = asyncWrapper(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const text = req.query.text;
  const status = req.query.status;
  const sellerId = req.query.sellerId;
  const skip = (page - 1) * limit;

  const query = {};

  const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  if (text) {
    const safeText = escapeRegex(text);
    const regex = { $regex: safeText, $options: "i" };

    query.$or = [
      { "title.ar": regex },
      { "title.en": regex },
      {
        _id: mongoose.Types.ObjectId.isValid(text)
          ? new mongoose.Types.ObjectId(text)
          : undefined,
      },
    ].filter(Boolean);
  }

  if (status) {
    if (Array.isArray(status)) {
      query.status = { $in: status };
    } else {
      query.status = status;
    }
  }

  if (sellerId && mongoose.Types.ObjectId.isValid(sellerId)) {
    query.seller = sellerId;
  }

  const [products, totalProductsCount] = await Promise.all([
    Product.find(query, { __v: 0 }).populate("seller").limit(limit).skip(skip),
    Product.countDocuments(query),
  ]);

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: {
      products,
      total: totalProductsCount,
      currentPage: page,
      pageSize: limit,
      totalPages: Math.ceil(totalProductsCount / limit),
    },
  });
});

// =======================================================================================
const getProduct = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const targetProduct = await Product.findById(productId)
    .populate("category")
    .populate("subCategory")
    .populate("productOwner");
  if (!productId) {
    const error = appError.create(
      "ProductId is required",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }
  if (!targetProduct) {
    const error = appError.create(
      "product n't found",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { product: targetProduct } });
});

// =======================================================================================
const addProduct = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ status: httpStatusText.FAIL, errors: { errors } });
  }

  const newProduct = new Product({ ...req.body });

  await newProduct.save();

  const sellerId = req?.body?.seller;
  const targetSeller = await Seller.findById(sellerId);

  if (!targetSeller) {
    const error = appError.create(
      {
        ar: "البائع غير موجود",
        en: "Seller not found",
      },
      400,
      httpStatusText.ERROR
    );
    return next(error);
  }

  targetSeller.products.push(newProduct?._id);

  // Save the updated seller document
  await targetSeller.save();
  return res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: { product: newProduct },
    message: {
      ar: "تم ارسال طلب باضافة المنتج بنجاح ",
      en: "Product addition request sent successfully",
    },
  });
});
// =======================================================================================

const editProduct = asyncWrapper(async (req, res, next) => {
  const { productId } = req.params;
  const targetProduct = await Product.findById(productId);
  if (!targetProduct) {
    const error = appError.create(
      "Product not found",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  let updateFields = { ...req.body };
  const finalImages = [];

  if (updateFields?.images) {
    if (Array.isArray(updateFields?.images)) {
      updateFields?.images.map((image) => {
        finalImages.push(image);
      });
      finalImages.forEach((image, index) => {
        // Remove "http://localhost:4000" from the beginning of each image URL
        finalImages[index] = image.replace(/^http:\/\/localhost:4000\//, "");
      });
    } else {
      finalImages.push(updateFields?.images);
    }
  }

  if (req.files && req.files.length > 0) {
    req.files.map((file) => {
      finalImages.push(`uploads/${file?.filename}`);
    });
  }

  // if (finalImages.length === 0) {
  //   const error = appError.create(
  //     "You have to add one image at least to your product",
  //     400,
  //     httpStatusText.FAIL
  //   );
  //   return next(error);
  // }
  updateFields.images = finalImages;
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      $set: updateFields,
    },
    {
      new: true,
    }
  );

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { product: updatedProduct },
    message: "Product updated successfully",
  });
});
// =======================================================================================
const deleteProduct = asyncWrapper(async (req, res, next) => {
  const { productId } = req.params;
  const targetProduct = await Product.findById(productId);
  const sellerId = targetProduct?.productOwner;

  if (!targetProduct) {
    const error = appError.create(
      "Product not found",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const targetSeller = await Seller.findById(sellerId);

  if (!targetSeller) {
    const error = appError.create(
      "seller not found",
      400,
      httpStatusText.ERROR
    );
    return next(error);
  }

  targetSeller.products.pull(productId);
  await targetSeller.save();

  await Product.deleteOne({ _id: productId });

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { product: targetProduct },
    message: "Product deleted successfully",
  });
});
// =======================================================================================

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
};
