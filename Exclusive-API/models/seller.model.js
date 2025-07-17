const mongoose = require("mongoose");
const validator = require("validator");
const { sellerStatus } = require("../utils/constants");

const sellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    image: { type: String, default: "uploads/user-default.png" },
    mobilePhone: { type: String, unique: true, required: true },
    address: { type: String },
    email: {
      type: String,
      validator: [validator.isEmail, "Email must be valid email"],
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: sellerStatus.NOTVERIFIED,
      enum: [
        sellerStatus.NOTVERIFIED,
        sellerStatus.VERIFIED,
        sellerStatus.BLOCKED,
      ],
    },
    blockReason: {
      type: String,
      default: null,
      validate: {
        validator: function (value) {
          if (value && this.status !== sellerStatus.BLOCKED) {
            return false;
          }
          return true;
        },
        message: "blockReason can only be set when status is BLOCKED",
      },
    },
    token: { type: String },
    verificationCode: {
      type: String,
    },

    verificationCodeExpires: {
      type: Date,
    },

    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
    officialDocuments: {
      nationalId: { type: String },
      taxCard: { type: String },
      commercialRegister: { type: String },
      otherDocs: [{ type: String }],
    },
    isProfileComplete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Seller", sellerSchema);
