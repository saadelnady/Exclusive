const { validationResult } = require("express-validator");
const asyncWrapper = require("../middlewares/asyncWrapper");
const subCategory = require("../models/subCategory.model.js");
const appError = require("../utils/appError");
const { httpStatusText } = require("../utils/constants");
const Category = require("../models/category.model");
const mongoose = require("mongoose");

const getAllSubCategories = asyncWrapper(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const text = req.query.text;
  const skip = (page - 1) * limit;

  const searchQuery = {};

  const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  if (text) {
    const safeText = escapeRegex(text);
    const regex = { $regex: safeText, $options: "i" };

    searchQuery.$or = [
      { "title.ar": regex },
      { "title.en": regex },
      {
        _id: mongoose.Types.ObjectId.isValid(text)
          ? new mongoose.Types.ObjectId(text)
          : undefined,
      },
    ].filter(Boolean);
  }

  const [subCategories, totalSubCategoriesCount] = await Promise.all([
    subCategory
      .find(searchQuery, { __v: 0 })
      .populate("category")
      .limit(limit)
      .skip(skip),
    subCategory.countDocuments(searchQuery),
  ]);

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: {
      subCategories,
      total: totalSubCategoriesCount,
      currentPage: page,
      pageSize: limit,
      totalPages: Math.ceil(totalSubCategoriesCount / limit),
    },
  });
});

const addSubCategory = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ status: httpStatusText.FAIL, errors: { errors } });
  }

  const { category: categoryId, title } = req.body; // title = { ar, en }

  const targetCategory = await Category.findById(categoryId);
  if (!targetCategory) {
    return res.json({
      status: httpStatusText.FAIL,
      errors: {
        ar: "القسم غير موجود",
        en: "Category not found",
      },
    });
  }

  // التحقق من وجود قسم فرعي بنفس الاسم داخل نفس القسم الرئيسي
  const subCategoryExist = await subCategory.findOne({
    category: categoryId,
    $or: [{ "title.ar": title.ar }, { "title.en": title.en }],
  });

  if (subCategoryExist) {
    const error = appError.create(
      {
        ar: "القسم الفرعي موجود بالفعل",
        en: "Subcategory already exists",
      },
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const newSubCategory = new subCategory({
    title,
    category: categoryId,
  });

  await newSubCategory.save();

  // تحديث القسم الرئيسي بإضافة الـ subCategory الجديد
  await Category.findByIdAndUpdate(categoryId, {
    $push: { subCategories: newSubCategory._id },
  });

  return res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: { subCategory: newSubCategory },
    message: {
      ar: "تم إضافة القسم الفرعي بنجاح",
      en: "Subcategory added successfully",
    },
  });
});

const getSubCategory = asyncWrapper(async (req, res, next) => {
  const { subCategoryId } = req.params;
  const targetSubCategory = await Subcategory.findById(subCategoryId).populate(
    "category"
  );
  if (!targetSubCategory) {
    const error = appError.create(
      "Subcategory not found",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }
  if (!subCategoryId) {
    const error = appError.create(
      "subCategoryId is required",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { subCategory: targetSubCategory },
  });
});

const editSubCategory = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: httpStatusText.FAIL, errors: { errors } });
  }

  const { subCategoryId } = req.params;
  const { category: categoryId, title } = req.body; // title = { ar, en }

  // تأكد من وجود القسم الفرعي
  const targetSubCategory = await Subcategory.findById(subCategoryId);
  if (!targetSubCategory) {
    const error = appError.create(
      {
        ar: "القسم الفرعي غير موجود",
        en: "Subcategory not found",
      },
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  // تأكد من وجود القسم الرئيسي
  const targetCategory = await Category.findById(categoryId);
  if (!targetCategory) {
    const error = appError.create(
      {
        ar: "القسم غير موجود",
        en: "Category not found",
      },
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  // التحقق من عدم وجود تكرار لنفس الاسم داخل نفس القسم ولكن يستثني القسم الفرعي الحالي
  const subCategoryExist = await Subcategory.findOne({
    _id: { $ne: subCategoryId },
    category: categoryId,
    $or: [{ "title.ar": title.ar }, { "title.en": title.en }],
  });

  if (subCategoryExist) {
    const error = appError.create(
      {
        ar: "قسم فرعي بنفس الاسم موجود بالفعل في هذا القسم",
        en: "Subcategory with the same title already exists in the category",
      },
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  // تجهيز البيانات المحدثة
  const updatedSubCategoryData = {
    title,
    category: categoryId,
  };

  if (req?.file) {
    updatedSubCategoryData.image = `uploads/${req.file.filename}`;
  }

  // لو تم تغيير القسم الرئيسي، احذف من القديم وضيف في الجديد
  if (categoryId !== targetSubCategory.category.toString()) {
    await Category.findByIdAndUpdate(targetSubCategory.category, {
      $pull: { subCategories: subCategoryId },
    });

    await Category.findByIdAndUpdate(categoryId, {
      $push: { subCategories: subCategoryId },
    });
  }

  const updatedSubCategory = await Subcategory.findByIdAndUpdate(
    subCategoryId,
    { $set: updatedSubCategoryData },
    { new: true }
  ).populate("category");

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { subCategory: updatedSubCategory },
    message: {
      ar: "تم تعديل القسم الفرعي بنجاح",
      en: "Subcategory updated successfully",
    },
  });
});

const deleteSubCategory = asyncWrapper(async (req, res, next) => {
  const { subCategoryId } = req.params;
  const targetSubCategory = await subCategory.findById(subCategoryId);
  if (!targetSubCategory) {
    const error = appError.create(
      {
        ar: "القسم الفرعي غير موجود",
        en: "Subcategory not found",
      },
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  await subCategory.deleteOne({
    _id: subCategoryId,
  });

  await Category.findByIdAndUpdate(
    targetSubCategory.category,
    { $pull: { subCategories: subCategoryId } },
    { new: true }
  );
  res.status(201).json({
    status: httpStatusText.SUCCESS,
    message: {
      ar: "تم حذف القسم الفرعي بنجاح",
      en: "Subcategory deleted successfully",
    },
    data: { SubCategory: targetSubCategory },
  });
});

module.exports = {
  getAllSubCategories,
  addSubCategory,
  getSubCategory,
  editSubCategory,
  deleteSubCategory,
};
