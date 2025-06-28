import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Shared/loading";
import { FormattedMessage, useIntl } from "react-intl";
import { useForm } from "react-hook-form";
import styles from "./styles/styles.module.scss";
import { Col, Row } from "react-bootstrap";
import UploadImg from "../Shared/uploadImg/Index";

import IcError from "./assets/images/svgs/ic-error.svg";
import { postData } from "@/API/API";
import { toast } from "react-toastify";
import {
  editCategory,
  fetchCategory,
} from "@/store/actions/categories/categoriesActions";

const ShowCategory = () => {
  const { categoryId } = useParams();

  const { category, isLoading } = useSelector(
    (state) => state.categoriesReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchCategory({ categoryId }));
  }, [categoryId, dispatch]);

  console.log("category", category);
  const [selectedImg, setSelectedImg] = useState({
    file: null,
    preview: null,
  });

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  const { locale, formatMessage } = useIntl();

  const onSubmit = async (data) => {
    data.image = selectedImg?.preview ? selectedImg?.preview : null;

    dispatch(editCategory({ data, categoryId, toast, locale, navigate }));
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
    if (selectedImg?.preview || selectedImg?.file) {
      setSelectedImg({ file: null, preview: null });
    }
  };

  useEffect(() => {
    if (category && categoryId) {
      setSelectedImg({ file: null, preview: category?.image });
      setValue("title.ar", category?.title?.ar);
      setValue("title.en", category?.title?.en);
    }
  }, [category, categoryId]);

  if (isLoading) return <Loading />;

  return (
    <div className={`page ${styles.addNewCategory}`}>
      <div className="page-header">
        <div className="text">
          <h4 className="page-title">
            <FormattedMessage id="editCategory" />
          </h4>
          <p className="page-description">
            <FormattedMessage id="editCategoryDescription" /> :
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
        </Row>

        <button type="submit" className="btn submit">
          {formatMessage({ id: "editCategory" })}
        </button>
      </form>
    </div>
  );
};

export default ShowCategory;
