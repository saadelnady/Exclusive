import React, { useState } from "react";
import styles from "./styles/styles.module.scss";
import { FormattedMessage, useIntl } from "react-intl";
import { useForm } from "react-hook-form";
import { Col, Row } from "react-bootstrap";

import IcError from "./assets/images/svgs/ic-error.svg";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UploadImg from "../Shared/uploadImg/Index";
import { postData } from "@/API/API";
import { addCategory } from "@/store/actions/categories/categoriesActions";

const AddNewCategory = () => {
  const [selectedImg, setSelectedImg] = useState({
    file: null,
    preview: null,
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const intl = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { locale, formatMessage } = useIntl();
  const onSubmit = async (data) => {
    data.image = selectedImg?.preview ? selectedImg?.preview : null;
    dispatch(addCategory({ data, toast, navigate, locale }));
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

  return (
    <div className={`page ${styles.addNewCategory}`}>
      <div className="page-header">
        <div className="text">
          <h4 className="page-title">
            <FormattedMessage id="addNewCategory" />
          </h4>
          <p className="page-description">
            <FormattedMessage id="addNewCategoryDescription" /> :
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
        </Row>

        <button type="submit" className="btn submit">
          {intl.formatMessage({ id: "addNewCategory" })}
        </button>
      </form>
    </div>
  );
};

export default AddNewCategory;
