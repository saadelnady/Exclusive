import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/styles.module.scss";
import { FormattedMessage, useIntl } from "react-intl";
import { useFieldArray, useForm } from "react-hook-form";
import { Col, Row, Dropdown } from "react-bootstrap";
import DeleteIcon from "./assets/images/svgs/ic-delete.svg";

import IcError from "./assets/images/svgs/ic-error.svg";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import { Controller } from "react-hook-form";
import { fetchCategories } from "@/store/actions/categories/categoriesActions";
import { addProduct } from "@/store/actions/products/productsActions";
import Table from "../Shared/Table/Index";
import ProductOptionsModal from "./ProductOptionsModal";

const AddNewProduct = () => {
  const { categories, currentPage, totalPages, isLoading } = useSelector(
    (state) => state.categoriesReducer
  );
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [show, setShow] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
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
  const menuRefs = useRef({});

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
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "items",
  });
  const handleShow = () => {
    setShow(!show);
  };

  const cols = [
    {
      label: "#",
      name: "#",
      render: (row, rowIdx) => <div>{rowIdx + 1}</div>,
    },
    {
      label: "image",
      name: "image",
      render: (row, rowIdx) => (
        <div className="img">
          <img src={row?.image} alt="admin-img" />
        </div>
      ),
    },
    {
      label: "title",
      name: "title",
      render: (row) => <div>{`${row?.title?.[locale]}`}</div>,
    },
    {
      label: "subTitle",
      name: "subTitle",
      render: (row) => <div>{`${row?.subTitle?.[locale]}`}</div>,
    },

    {
      label: "actions",
      name: "actions",
      render: (row, rowIdx) => (
        <div
          className="actions"
          ref={(el) => {
            if (el) menuRefs.current[row.id] = el;
          }}
        >
          <button
            className="actions-btn"
            type="button"
            onClick={() =>
              setOpenMenuId((prev) => (prev === row.id ? null : row.id))
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <circle cx="8" cy="3" r="1.5" />
              <circle cx="8" cy="8" r="1.5" />
              <circle cx="8" cy="13" r="1.5" />
            </svg>
          </button>
          {openMenuId === row?.id && (
            <div className="custom-dropdown">
              <button
                type="button"
                onClick={() => {
                  handleShow();
                  setSelectedOption(row);
                  setSelectedIndex(rowIdx);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="bi bi-eye"
                  viewBox="0 0 24 24"
                >
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>

                <FormattedMessage id="view" />
              </button>

              <button
                type="button"
                onClick={() => {
                  // handleShowWarning();
                  // setSelectedOption(row);
                  // setSelectedIndex(rowIdx);
                }}
              >
                <DeleteIcon />
                <FormattedMessage id="delete" />
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];
  const onSubmit = async (data) => {
    // data.image = selectedImg?.preview ? selectedImg?.preview : null;
    dispatch(addProduct({ data, toast, navigate, locale }));
  };
  return (
    <div className={`page ${styles.addNewProduct}`}>
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
          {/* Title */}
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
          {/* Description */}
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

          {/* categories */}
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
          {/* subcategories */}
          <Col xs={12} md={6}>
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
                    <Dropdown.Item disabled className="text-center text-muted">
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
          </Col>

          <button
            type="button"
            className="btn btn-secondary mb-3 mt-2 w-25"
            onClick={handleShow}
          >
            <FormattedMessage id="addOption" />
          </button>
          <h3>
            <FormattedMessage id="options" />
          </h3>
        </Row>
        <Table cols={cols} rows={fields} />
        <ProductOptionsModal
          show={show}
          handleShow={handleShow}
          append={append}
          selectedOption={selectedOption}
          update={update}
          index={selectedIndex}
        />
        <button type="submit" className="btn submit">
          {formatMessage({ id: "addNewProduct" })}
        </button>
      </form>
    </div>
  );
};

export default AddNewProduct;
