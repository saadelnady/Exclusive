import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/styles.module.scss";
import { FormattedMessage, useIntl } from "react-intl";
import { useFieldArray, useForm } from "react-hook-form";
import { Col, Row, Dropdown } from "react-bootstrap";

import IcError from "./assets/images/svgs/ic-error.svg";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import { Controller } from "react-hook-form";
import { fetchCategories } from "@/store/actions/categories/categoriesActions";
import { addProduct } from "@/store/actions/products/productsActions";
const AddNewProduct = () => {
  const { categories, currentPage, totalPages, isLoading } = useSelector(
    (state) => state.categoriesReducer
  );
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    control,
    setValue,
    clearErrors,
  } = useForm();
  const intl = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { locale, formatMessage } = useIntl();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const dropdownRef = useRef();
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ font: [] }],
      [{ size: [] }],

      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  useEffect(() => {
    dispatch(fetchCategories({ page: 1, limit: 10, append: true }));
  }, []);

  useEffect(() => {
    setValue("categoryId", selectedCategory?._id);
    setValue("subCategoryId", selectedSubCategory?._id);
  }, [selectedCategory, selectedSubCategory, setValue]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isBottom = scrollTop + clientHeight >= scrollHeight - 5;
    if (isBottom && !isLoading && currentPage < totalPages) {
      dispatch(fetchCategories({ page: currentPage + 1, append: true }));
    }
  };
  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setValue("categoryId", cat._id);
    clearErrors("categoryId");
  };
  const handleSelectedSubCategory = (subCat) => {
    setSelectedSubCategory(subCat);
    setValue("subCategoryId", subCat._id);
    clearErrors("subCategoryId");
  };
  const { fields: optionFields, append: appendOption } = useFieldArray({
    control,
    name: "options",
  });
  const onSubmit = async (data) => {
    // data.image = selectedImg?.preview ? selectedImg?.preview : null;
    dispatch(addProduct({ data, toast, navigate, locale }));
  };
  return (
    <div className={`page ${styles.addNewCategory}`}>
      <div className="page-header">
        <div className="text">
          <h4 className="page-title">
            <FormattedMessage id="addNewProduct" />
          </h4>
          <p className="page-description">
            <FormattedMessage id="addNewProductDescription" /> :
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs={12} md={6}>
            <div className="input-wrapper">
              <label className="label" htmlFor="titleAr">
                {formatMessage({ id: "titleAr" })} :
              </label>
              <input
                id="titleAr"
                {...register("title.ar", {
                  required: formatMessage({ id: "required" }),
                  minLength: {
                    value: 3,
                    message: formatMessage({ id: "titleMinLength" }),
                  },
                  maxLength: {
                    value: 20,
                    message: formatMessage({ id: "titleMaxLength" }),
                  },
                })}
                className="special-input"
              />
              {errors?.title?.ar && (
                <p className="error">
                  <IcError />
                  {errors?.title?.ar?.message}
                </p>
              )}
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="input-wrapper">
              <label className="label" htmlFor="titleEn">
                {formatMessage({ id: "titleEn" })} :
              </label>
              <input
                id="titleEn"
                {...register("title.en", {
                  required: formatMessage({ id: "required" }),
                  minLength: {
                    value: 3,
                    message: formatMessage({ id: "titleMinLength" }),
                  },
                  maxLength: {
                    value: 20,
                    message: formatMessage({ id: "titleMaxLength" }),
                  },
                })}
                className="special-input"
              />
              {errors?.title?.en && (
                <p className="error">
                  <IcError />
                  {errors?.title?.en?.message}
                </p>
              )}
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="input-wrapper">
              <label className="label">
                {formatMessage({ id: "descriptionAr" })} :
              </label>
              <Controller
                name="description.ar"
                direction="rtl"
                dir="rtl"
                control={control}
                rules={{
                  required: formatMessage({ id: "required" }),
                }}
                render={({ field }) => (
                  <ReactQuill
                    theme="snow"
                    className="special-quill"
                    modules={quillModules}
                    direction="rtl"
                    dir="rtl"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={formatMessage({
                      id: "descriptionPlaceholderAr",
                    })}
                  />
                )}
              />
              {errors.description?.ar && (
                <p className="error">
                  <IcError />
                  {errors.description.ar.message}
                </p>
              )}
            </div>
          </Col>

          <Col xs={12} md={6}>
            <div className="input-wrapper">
              <label className="label">
                {formatMessage({ id: "descriptionEn" })} :
              </label>
              <Controller
                name="description.en"
                control={control}
                rules={{
                  required: formatMessage({ id: "required" }),
                }}
                render={({ field }) => (
                  <ReactQuill
                    theme="snow"
                    className="special-quill"
                    value={field.value}
                    modules={quillModules}
                    onChange={field.onChange}
                    placeholder={formatMessage({
                      id: "descriptionPlaceholderEn",
                    })}
                  />
                )}
              />
              {errors.description?.en && (
                <p className="error">
                  <IcError />
                  {errors.description.en.message}
                </p>
              )}
            </div>
          </Col>

          <Col xs={12} md={6}>
            <div className="input-wrapper">
              <label className="label" htmlFor="category">
                {formatMessage({ id: "category" })} :
              </label>

              <Dropdown>
                <Dropdown.Toggle
                  id="category"
                  className="special-input special-select"
                >
                  {selectedCategory
                    ? selectedCategory?.title?.[locale]
                    : formatMessage({ id: "selectCategory" })}
                </Dropdown.Toggle>

                <Dropdown.Menu
                  ref={dropdownRef}
                  onScroll={handleScroll}
                  style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                    width: "100%",
                  }}
                >
                  {categories?.map((cat) => (
                    <Dropdown.Item
                      key={cat._id}
                      onClick={() => handleSelectCategory(cat)}
                    >
                      {cat.title?.[locale]}
                    </Dropdown.Item>
                  ))}

                  {isLoading && (
                    <Dropdown.Item disabled className="text-center text-muted">
                      <FormattedMessage id="loading" />
                    </Dropdown.Item>
                  )}

                  {!isLoading && currentPage === totalPages && (
                    <Dropdown.Item disabled className=" ">
                      {formatMessage({ id: "noMoreCategories" })}
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>

              <input
                type="hidden"
                {...register("categoryId", {
                  required: formatMessage({ id: "required" }),
                })}
              />

              {errors.categoryId && errors.categoryId.message && (
                <p className="error d-flex align-items-center gap-1 mt-1">
                  <IcError />
                  {errors.categoryId.message}
                </p>
              )}
            </div>
          </Col>

          <Col xs={12} md={6}>
            {selectedCategory && (
              <div className="input-wrapper">
                <label className="label" htmlFor="subCategory">
                  {formatMessage({ id: "subCategory" })} :
                </label>

                <Dropdown>
                  <Dropdown.Toggle
                    id="subCategory"
                    className="special-input special-select"
                  >
                    {selectedSubCategory
                      ? selectedSubCategory?.title?.[locale]
                      : formatMessage({ id: "selectSubCategory" })}
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    style={{
                      maxHeight: "200px",
                      overflowY: "auto",
                      width: "100%",
                    }}
                  >
                    {selectedCategory?.subCategories?.length > 0 ? (
                      selectedCategory?.subCategories?.map((subCat) => (
                        <Dropdown.Item
                          key={subCat._id}
                          onClick={() => handleSelectedSubCategory(subCat)}
                        >
                          {subCat.title?.[locale]}
                        </Dropdown.Item>
                      ))
                    ) : (
                      <Dropdown.Item
                        disabled
                        className="text-center text-muted"
                      >
                        <FormattedMessage id="noSubCategories" />
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>

                <input
                  type="hidden"
                  {...register("subCategoryId", {
                    required: formatMessage({ id: "required" }),
                  })}
                />

                {errors.subCategoryId && errors.subCategoryId.message && (
                  <p className="error d-flex align-items-center gap-1 mt-1">
                    <IcError />
                    {errors.subCategoryId.message}
                  </p>
                )}
              </div>
            )}
          </Col>
          {/* Options */}
          <h3>Options</h3>
          {optionFields.map((option, optionIndex) => (
            <div key={option.id} className="border p-4 rounded-md">
              {/* Images */}
              <input
                placeholder="Image URL"
                {...register(`options.${optionIndex}.images.0`)}
              />

              {/* Attributes */}
              <input
                placeholder="Attribute Title AR"
                {...register(`options.${optionIndex}.attributes.0.title.ar`)}
              />
              <input
                placeholder="Attribute Title EN"
                {...register(`options.${optionIndex}.attributes.0.title.en`)}
              />
              <input
                placeholder="Attribute Value"
                {...register(`options.${optionIndex}.attributes.0.value`)}
              />

              {/* Stock Count */}
              <input
                type="number"
                placeholder="Stock Count"
                {...register(`options.${optionIndex}.stockCount`, {
                  valueAsNumber: true,
                })}
              />

              {/* Price */}
              <input
                type="number"
                placeholder="Price Before Discount"
                {...register(
                  `options.${optionIndex}.price.priceBeforeDiscount`,
                  {
                    valueAsNumber: true,
                  }
                )}
              />
              <input
                type="number"
                placeholder="Discount Percentage"
                {...register(
                  `options.${optionIndex}.price.discountPercentage`,
                  {
                    valueAsNumber: true,
                  }
                )}
              />
              <input
                type="number"
                placeholder="Discount Value"
                {...register(`options.${optionIndex}.price.discountValue`, {
                  valueAsNumber: true,
                })}
              />
              <input
                type="number"
                placeholder="Final Price"
                {...register(`options.${optionIndex}.price.finalPrice`, {
                  valueAsNumber: true,
                })}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              appendOption({
                images: [""],
                attributes: [{ title: { ar: "", en: "" }, value: "" }],
                stockCount: 0,
                price: {
                  priceBeforeDiscount: 0,
                  discountPercentage: 0,
                  discountValue: 0,
                  finalPrice: 0,
                },
                soldOut: 0,
              })
            }
          >
            + Add Option
          </button>
        </Row>

        <button type="submit" className="btn submit">
          {formatMessage({ id: "addNewProduct" })}
        </button>
      </form>
    </div>
  );
};

export default AddNewProduct;
