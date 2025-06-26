import React, { useEffect, useState, useRef } from "react";
import styles from "./styles/styles.module.scss";
import { FormattedMessage, useIntl } from "react-intl";
import { useForm } from "react-hook-form";
import { Col, Row, Dropdown, Spinner } from "react-bootstrap";

import IcError from "./assets/images/svgs/ic-error.svg";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UploadImg from "../Shared/uploadImg/Index";
import { postData } from "@/API/API";
import { fetchCategories } from "@/store/actions/categories/categoriesActions";
import { addSubCategory } from "@/store/actions/subCategories/subCategoriesActions";

const AddNewSubCategory = () => {
  const { categories } = useSelector((state) => state.categoriesReducer);
  const [selectedImg, setSelectedImg] = useState({ file: null, preview: null });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const intl = useIntl();
  const { locale, formatMessage } = intl;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Dropdown logic
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef();

  useEffect(() => {
    loadCategories(page);
  }, [page]);

  const loadCategories = (pageNumber) => {
    setLoading(true);

    dispatch(fetchCategories({ page: pageNumber, limit: 10, locale }));
    const newLength = categories?.length || 0;
    if (newLength < pageNumber * 10) setHasMore(false);
    setLoading(false);
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const nearBottom = scrollTop + clientHeight >= scrollHeight - 10;
    if (nearBottom && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  const handleSelect = (category) => {
    setSelected(category);
    setValue("categoryId", category._id, { shouldValidate: true });
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("files", file);

    try {
      const uploadImgResponse = await postData("/api/upload", formData);
      setSelectedImg({ file, preview: uploadImgResponse?.files?.[0]?.url });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleRemoveImg = () => {
    setSelectedImg({ file: null, preview: null });
  };

  const onSubmit = (data) => {
    data.image = selectedImg?.preview || null;
    dispatch(addSubCategory({ data, toast, navigate, locale }));
  };

  return (
    <div className={`page ${styles.addNewSubCategory}`}>
      <div className="page-header">
        <div className="text">
          <h4 className="page-title">
            <FormattedMessage id="addNewSubCategory" />
          </h4>
          <p className="page-description">
            <FormattedMessage id="addNewSubCategoryDescription" /> :
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs={12}>
            <UploadImg
              handleImageChange={handleImageChange}
              selectedImg={selectedImg}
              handleRemoveImg={handleRemoveImg}
              register={register}
              errors={errors}
            />
          </Col>

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
                    value: 5,
                    message: formatMessage({ id: "min-length" }),
                  },
                  maxLength: {
                    value: 20,
                    message: formatMessage({ id: "max-length" }),
                  },
                })}
                className="special-input"
              />
              {errors.title?.ar && (
                <p className="error">
                  <IcError />
                  {errors.title?.ar.message}
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
                dir="ltr"
                {...register("title.en", {
                  required: formatMessage({ id: "required" }),
                  minLength: {
                    value: 5,
                    message: formatMessage({ id: "min-length" }),
                  },
                  maxLength: {
                    value: 20,
                    message: formatMessage({ id: "max-length" }),
                  },
                })}
                className="special-input"
              />
              {errors.title?.en && (
                <p className="error">
                  <IcError />
                  {errors.title?.en.message}
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
                  {selected
                    ? selected.title?.[locale]
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
                      onClick={() => handleSelect(cat)}
                    >
                      {cat.title?.[locale]}
                    </Dropdown.Item>
                  ))}
                  {loading && (
                    <Dropdown.Item disabled className="text-center">
                      <Spinner animation="border" size="sm" />{" "}
                      {formatMessage({ id: "loading" })}
                    </Dropdown.Item>
                  )}
                  {!hasMore && !loading && categories.length > 0 && (
                    <Dropdown.Item disabled className="text-muted text-center">
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
              {errors?.categoryId?.message && (
                <p className="error d-flex align-items-center gap-1 mt-1">
                  <IcError />
                  {errors.categoryId.message}
                </p>
              )}
            </div>
          </Col>
        </Row>

        <button type="submit" className="btn submit">
          {intl.formatMessage({ id: "add" })}
        </button>
      </form>
    </div>
  );
};

export default AddNewSubCategory;
