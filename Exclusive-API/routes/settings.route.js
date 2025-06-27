const express = require("express");
const {
  getAllSettings,
  editSettings,
  addSettings,
} = require("../controller/settings.controller.js");

const verifyToken = require("../middlewares/verifyToken");
const { roles } = require("../utils/constants");
const alloewdTo = require("../middlewares/alloewdTo");

const router = express.Router();

router
  .route("/")
  .get(getAllSettings)
  .post(verifyToken, alloewdTo(roles.SUPER_ADMIN), addSettings)
  .put(verifyToken, alloewdTo(roles.SUPER_ADMIN), editSettings);

module.exports = router;
