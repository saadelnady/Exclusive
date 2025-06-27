const mongoose = require("mongoose");
const validator = require("validator");

const settingsSchema = new mongoose.Schema(
  {
    appName: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    logo: {
      type: String,
    },
    favIcon: {
      type: String,
    },
    phone: { type: String, unique: true },
    address: {
      ar: { type: String },
      en: { type: String },
    },
    email: {
      type: String,

      unique: true,
      validate: [validator.isEmail, "Email must be valid email"],
    },

    socialMediaLinks: [
      {
        name: {
          type: String,
          enum: [
            "facebook",
            "twitter",
            "instagram",
            "linkedin",
            "youtube",
            "tiktok",
          ],
        },
        url: {
          type: String,
          validate: [validator.isURL, "Must be a valid URL"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Settings", settingsSchema);
