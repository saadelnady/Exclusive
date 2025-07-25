const { body } = require("express-validator");
const { productStatus } = require("../utils/constants");

const productValidation = () => {
  return [
    body("title.ar")
      .notEmpty()
      .withMessage("Arabic title is required")
      .isLength({ min: 3, max: 100 })
      .withMessage("Arabic title must be between 3 and 100 characters"),

    body("title.en")
      .notEmpty()
      .withMessage("English title is required")
      .isLength({ min: 3, max: 100 })
      .withMessage("English title must be between 3 and 100 characters"),

    body("description.ar")
      .notEmpty()
      .withMessage("Arabic description is required")
      .isLength({ min: 10, max: 500 })
      .withMessage("Arabic description must be between 10 and 500 characters"),

    body("description.en")
      .notEmpty()
      .withMessage("English description is required")
      .isLength({ min: 10, max: 500 })
      .withMessage("English description must be between 10 and 500 characters"),

    body("category")
      .notEmpty()
      .withMessage("Product category is required")
      .isMongoId()
      .withMessage("Invalid category ID"),

    body("subCategory")
      .notEmpty()
      .withMessage("Product subcategory is required")
      .isMongoId()
      .withMessage("Invalid subcategory ID"),

    body("seller")
      .notEmpty()
      .withMessage("Product seller is required")
      .isMongoId()
      .withMessage("Invalid seller ID"),

    body("options")
      .isArray({ min: 1 })
      .withMessage("At least one option is required"),

    body("options.*.images")
      .optional()
      .isArray()
      .withMessage("Images must be an array"),

    body("options.*.attributes")
      .isArray({ min: 1 })
      .withMessage("Each option must have at least one attribute"),

    body("options.*.attributes.*.title.ar")
      .notEmpty()
      .withMessage("Arabic attribute title is required"),

    body("options.*.attributes.*.title.en")
      .notEmpty()
      .withMessage("English attribute title is required"),

    body("options.*.attributes.*.value")
      .notEmpty()
      .withMessage("Attribute value is required"),

    body("options.*.stockCount")
      .notEmpty()
      .withMessage("Stock count is required")
      .isInt({ min: 0 })
      .withMessage("Stock count must be 0 or more"),

    body("options.*.price.priceBeforeDiscount")
      .notEmpty()
      .withMessage("Price before discount is required")
      .isFloat({ min: 0 })
      .withMessage("Price before discount must be 0 or more"),

    body("options.*.price.finalPrice")
      .notEmpty()
      .withMessage("Final price is required")
      .isFloat({ min: 0 })
      .withMessage("Final price must be 0 or more"),

    body("options.*.price.discountPercentage")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Discount percentage must be 0 or more"),

    body("options.*.price.discountValue")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Discount value must be 0 or more"),

    body("status")
      .optional()
      .isIn([
        productStatus.ACCEPTED,
        productStatus.BLOCKED,
        productStatus.PENDING,
      ])
      .withMessage("Invalid product status"),
  ];
};

module.exports = { productValidation };
