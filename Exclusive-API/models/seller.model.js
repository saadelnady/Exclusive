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
        sellerStatus.REJECTED,
        sellerStatus.PENDING_APPROVAL,
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
    dateOfBirth: { type: Date },
    token: { type: String },
    verificationCode: {
      type: String,
    },

    verificationCodeExpires: {
      type: Date,
    },

    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
    nationalId: { type: String },
    officialDocuments: {
      frontId: { type: String, required: true },
      backId: { type: String, required: true },
      taxCard: { type: String, required: true },
      commercialRegister: { type: String, required: true },
      otherDocs: { type: String, required: true },
    },
    isProfileComplete: {
      type: Boolean,
      default: false,
    },

    storeName: { type: String },

    paymentInfo: {
      cardHolderName: { type: String },
      cardLast4Digits: { type: String },
      cardBrand: { type: String },
      expiryDate: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Seller", sellerSchema);
