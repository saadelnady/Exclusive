const express = require("express");
const {
  registerValidation,
  loginValidation,
} = require("../middlewares/authValidation");
const {
  sellerRegister,
  sellerLogin,
  getSeller,
  editSeller,
  getSellerProducts,
  getAllSellers,
  deleteSeller,
  getSellerProfile,
  verifySeller,
  resendVerificationCode,
  getSellerStatistics,
} = require("../controller/seller.controller.js");

const verifyToken = require("../middlewares/verifyToken");
const { roles } = require("../utils/constants");
const alloewdTo = require("../middlewares/alloewdTo");
const {
  editProfileValidation,
} = require("../middlewares/editProfileValidation");

const router = express.Router();

router
  .route("/")
  .get(verifyToken, alloewdTo(roles.ADMIN, roles.SUPER_ADMIN), getAllSellers);

router.route("/getSellerProducts").get(getSellerProducts);
router.route("/statistics").get(verifyToken, getSellerStatistics);

router
  .route("/:sellerId")
  .get(getSeller)
  .delete(verifyToken, alloewdTo(roles.ADMIN, roles.SUPER_ADMIN), deleteSeller);

router
  .route("/:sellerId")
  .put(verifyToken, editProfileValidation(), editSeller);

router.route("/getSellerProfile").get(verifyToken, getSellerProfile);
router.route("/register").post(registerValidation(), sellerRegister);
router.route("/login").post(loginValidation(), sellerLogin);
router.route("/otp").post(verifySeller);
router.route("/resendVerification").post(resendVerificationCode);
module.exports = router;
