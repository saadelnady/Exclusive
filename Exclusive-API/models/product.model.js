const mongoose = require("mongoose");
const { productStatus } = require("../utils/constants");

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

    options: [
      {
        images: { type: [String], default: [] },
        attributes: [
          {
            title: {
              ar: { type: String, required: true },
              en: { type: String, required: true },
            },
            value: { type: String, required: true },
          },
        ],
        stockCount: {
          type: Number,
          required: true,
          min: [0, "Stock cannot be negative"],
        },
        price: {
          priceBeforeDiscount: { type: Number, required: true, min: 0 },
          discountPercentage: { type: Number, default: 0 },
          discountValue: { type: Number, default: 0 },
          finalPrice: { type: Number, required: true, min: 0 },
        },
        soldOut: { type: Number, default: 0 },
      },
    ],

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
