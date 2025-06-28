import React, { useEffect, useState, useRef } from "react";
import styles from "./styles/styles.module.scss";
import { FormattedMessage, useIntl } from "react-intl";
import { set, useForm } from "react-hook-form";
import { Col, Row, Dropdown, Spinner } from "react-bootstrap";

import IcError from "./assets/images/svgs/ic-error.svg";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UploadImg from "../Shared/uploadImg/Index";
import { postData } from "@/API/API";
import { fetchCategories } from "@/store/actions/categories/categoriesActions";
import {
  editSubCategory,
  fetchSubCategory,
} from "@/store/actions/subCategories/subCategoriesActions";
import Loading from "../Shared/loading";

const ShowSubCategory = () => {
  const { categories, currentPage, totalPages, isLoading } = useSelector(
    (state) => state.categoriesReducer
  );
  const { subCategory, isLoading: subCategoryLoading } = useSelector(
    (state) => state.subCategoriesReducer
  );
  const { subCategoryId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedImg, setSelectedImg] = useState({ file: null, preview: null });

  const { locale, formatMessage } = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dropdownRef = useRef();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchCategories({ page: 1, limit: 10, append: true }));
  }, []);
  useEffect(() => {
    dispatch(fetchSubCategory(subCategoryId));
  }, []);

  useEffect(() => {
    if (subCategory) {
      setSelectedCategory(
        categories.find((cat) => cat._id === subCategory?.category?._id)
      );
      setSelectedImg({ file: null, preview: subCategory?.image });
      setValue("title.ar", subCategory?.title?.ar);
      setValue("title.en", subCategory?.title?.en);
      setValue("categoryId", subCategory?.category?._id);
      setValue("image", subCategory.image);
    }
  }, [subCategory, subCategoryId]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isBottom = scrollTop + clientHeight >= scrollHeight - 5;
    if (isBottom && !isLoading && currentPage < totalPages) {
      dispatch(fetchCategories({ page: currentPage + 1, append: true }));
    }
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
  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setValue("categoryId", cat._id);
    clearErrors("categoryId");
  };

  const onSubmit = (data) => {
    data.image = selectedImg?.preview || null;
    dispatch(editSubCategory({ subCategoryId, data, toast, navigate, locale }));
  };

  if (subCategoryLoading) return <Loading />;

  return (
    <div className={`page ${styles.addNewSubCategory}`}>
      <div className="page-header">
        <div className="text">
          <h4 className="page-title">
            <FormattedMessage id="editSubCategory" />
          </h4>
          <p className="page-description">
            <FormattedMessage id="editSubCategoryDescription" /> :
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
              name="image"
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
                    message: formatMessage({ id: "minLength" }),
                  },
                  maxLength: {
                    value: 20,
                    message: formatMessage({ id: "maxLength" }),
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
                    message: formatMessage({ id: "minLength" }),
                  },
                  maxLength: {
                    value: 20,
                    message: formatMessage({ id: "maxLength" }),
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
        </Row>

        <button type="submit" className="btn submit">
          <FormattedMessage id="edit" />
        </button>
      </form>
    </div>
  );
};

export default ShowSubCategory;
