const asyncWrapper = require("../middlewares/asyncWrapper");
const Settings = require("../models/settings.model.js");
const { httpStatusText } = require("../utils/constants");
const appError = require("../utils/appError");

const getAllSettings = asyncWrapper(async (req, res, next) => {
  const settings = await Settings.find();

  if (!settings) {
    const error = appError.create(
      {
        ar: "لا يوجد اعدادات لعرضها",
        en: "There is no settings to show",
      },
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: {
      settings,
    },
  });
});
const addSettings = asyncWrapper(async (req, res, next) => {
  const existing = await Settings.findOne();
  if (existing) {
    const error = appError.create(
      {
        ar: "الإعدادات موجودة بالفعل",
        en: "Settings already exist",
      },
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const settings = await Settings.create(req.body);

  return res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: {
      settings,
    },
  });
});

const editSettings = asyncWrapper(async (req, res, next) => {
  const settings = await Settings.findOneAndUpdate(
    {},
    { ...req.body },
    { new: true }
  );
  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { settings },
    message: {
      ar: "تم  تعديل اعدادات الموقع بنجاح",
      en: "Website settings updated successfully",
    },
  });
});

module.exports = { addSettings, getAllSettings, editSettings };
