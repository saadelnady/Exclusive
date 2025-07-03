import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
import styles from "./styles/styles.module.scss";
import UploadImg from "@/components/Shared/uploadImg/Index";
import { useForm } from "react-hook-form";
import IcError from "./assets/images/svgs/ic-error.svg";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import { Controller } from "react-hook-form";
import { postData } from "@/API/API";
import { useDispatch, useSelector } from "react-redux";
import {
  editPageSection,
  fetchPageSection,
} from "@/store/actions/pageSections/actions";
import Loading from "@/components/Shared/loading";
const OurStory = () => {
  const { section, isLoading } = useSelector(
    (state) => state.pageSectionsReducer
  );
  const [selectedImg, setSelectedImg] = useState({ file: null, preview: null });
  const { locale, formatMessage } = useIntl();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchPageSection({ pageSlug: "about", sectionSlug: "our-story" }));
  }, []);
  console.log("section", section);

  useEffect(() => {
    if (section) {
      setValue("title.ar", section?.title?.ar);
      setValue("title.en", section?.title?.en);

      setValue("description.ar", section?.description?.ar);
      setValue("description.en", section?.description?.en);

      setValue("image", section?.image);
      setSelectedImg({ file: null, preview: section?.image });
    }
  }, [section]);
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

  const submitHandler = (updatedData) => {
    updatedData.image = selectedImg?.preview ? selectedImg?.preview : null;
    const data = { section: updatedData };
    dispatch(
      editPageSection({
        pageSlug: "about",
        sectionSlug: "our-story",
        data,
        toast,
        locale,
      })
    );
  };
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={`page ${styles.OurStory}`}>
      <div className="page-header">
        <Row>
          <Col xs={12} md={6}>
            <div className="text">
              <h4 className="page-title">
                <FormattedMessage id="ourStory" />
              </h4>
            </div>
          </Col>
        </Row>
      </div>

      <form onSubmit={handleSubmit(submitHandler)}>
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
        </Row>
        <button type="submit" className="btn submit">
          <FormattedMessage id="edit" />
        </button>
      </form>
    </div>
  );
};

export default OurStory;
