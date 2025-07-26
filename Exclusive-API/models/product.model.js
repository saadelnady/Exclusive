const mongoose = require("mongoose");
const { productStatus } = require("../utils/constants");

// السعر كسكيما فرعي لسهولة إعادة الاستخدام
const priceSchema = new mongoose.Schema(
  {
    priceBeforeDiscount: { type: Number, required: true, min: 0 },
    discountPercentage: { type: Number, default: 0, min: 0, max: 100 },
    discountValue: { type: Number, default: 0, min: 0 },
    finalPrice: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

// الـ attribute داخل الـ option
const attributeSchema = new mongoose.Schema(
  {
    key: { type: String, required: true }, // زي color, size, wattage
    title: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    value: { type: String, required: true },
  },
  { _id: false }
);

// custom validator لمنع تكرار نفس key في نفس option
const optionSchema = new mongoose.Schema(
  {
    images: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) => arr.length <= 10,
        message: "Maximum of 10 images allowed per option.",
      },
    },
    attributes: {
      type: [attributeSchema],
      validate: {
        validator: function (attrs) {
          const keys = attrs.map((a) => a.key);
          return keys.length === new Set(keys).size;
        },
        message: "Each attribute key must be unique within an option.",
      },
    },
    stockCount: {
      type: Number,
      required: true,
      min: [0, "Stock cannot be negative"],
    },
    price: priceSchema,
    soldOut: { type: Number, default: 0 },
  },
  { _id: false }
);

// المنتج الأساسي
const productSchema = new mongoose.Schema(
  {
    title: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    description: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    subCategory: { type: mongoose.Types.ObjectId, ref: "Subcategory" },
    seller: { type: mongoose.Types.ObjectId, ref: "Seller" },

    options: [optionSchema],

    status: {
      type: String,
      enum: [
        productStatus.ACCEPTED,
        productStatus.BLOCKED,
        productStatus.PENDING,
      ],
      default: productStatus.PENDING,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
