import { postData } from "@/API/API";
import UploadImg from "@/components/Shared/uploadImg/Index";
import React, { useEffect, useState } from "react";
import { Modal, Col, Row } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
import IcClose from "./assets/images/svgs/ic-close.svg";
import styles from "./styles/styles.module.scss";
import { isObjectNotEmpty } from "@/helpers/checkers";
import IcError from "./assets/images/svgs/ic-error.svg";
import { useForm } from "react-hook-form";

const FeatureModal = ({
  show,
  handleShow,
  append,
  selectedFeature,
  update,
  index,
}) => {
  const [selectedImg, setSelectedImg] = useState({ file: null, preview: null });
  const { locale, formatMessage } = useIntl();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    control,
    reset,
    formState: { errors },
  } = useForm();
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

  useEffect(() => {
    if (isObjectNotEmpty(selectedFeature)) {
      clearErrors();
      setSelectedImg({ file: null, preview: selectedFeature?.image });
      setValue("image", selectedFeature?.image);

      setValue("title.ar", selectedFeature?.title?.ar);
      setValue("title.en", selectedFeature?.title?.en);

      setValue("subTitle.ar", selectedFeature?.subTitle?.ar);
      setValue("subTitle.en", selectedFeature?.subTitle?.en);
    } else {
      reset();
      setSelectedImg({ file: null, preview: null });
    }
  }, [selectedFeature]);

  const submitHandler = (data) => {
    data.image = selectedImg?.preview ? selectedImg?.preview : null;

    if (isObjectNotEmpty(selectedFeature)) {
      update(index, data);
    } else {
      append(data);
    }

    handleShow();
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={() => {
        handleShow();
      }}
      centered
      className={styles.modal}
    >
      <Modal.Header>
        <Modal.Title>
          <FormattedMessage
            id={selectedFeature ? "editFeature" : "addFeature"}
          />
        </Modal.Title>
        <button
          onClick={() => {
            handleShow();
          }}
        >
          <IcClose />
        </button>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Row>
            <UploadImg
              handleImageChange={handleImageChange}
              selectedImg={selectedImg}
              handleRemoveImg={handleRemoveImg}
              register={register}
              errors={errors}
              name="image"
            />
            <Col xs={12} md={6}>
              <div className="input-wrapper">
                <label className="label" htmlFor="titleAr">
                  {formatMessage({ id: "titleAr" })} :
                </label>
                <input
                  id="titleAr"
                  {...register(`title.ar`, {
                    required: formatMessage({ id: "required" }),
                  })}
                  className="special-input"
                />
                {errors?.title?.ar && (
                  <p className="error">
                    <IcError />
                    {errors?.title?.ar.message}
                  </p>
                )}
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="input-wrapper">
                <label className="label" htmlFor="titleAr">
                  {formatMessage({ id: "titleAr" })} :
                </label>
                <input
                  dir="ltr"
                  id="titleAr"
                  {...register(`title.en`, {
                    required: formatMessage({ id: "required" }),
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
                <label className="label" htmlFor="subTitleAr">
                  {formatMessage({ id: "subTitleAr" })} :
                </label>
                <input
                  id="subTitleAr"
                  dir="rtl"
                  {...register("subTitle.ar", {
                    required: formatMessage({ id: "required" }),
                  })}
                  className="special-input"
                />
                {errors?.subTitle?.ar && (
                  <p className="error">
                    <IcError />
                    {errors?.subTitle?.ar?.message}
                  </p>
                )}
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="input-wrapper">
                <label className="label" htmlFor="subTitleEn">
                  {formatMessage({ id: "subTitleEn" })} :
                </label>
                <input
                  id="subTitleEn"
                  dir="ltr"
                  {...register("subTitle.en", {
                    required: formatMessage({ id: "required" }),
                  })}
                  className="special-input"
                />
                {errors?.subTitle?.en && (
                  <p className="error">
                    <IcError />
                    {errors?.subTitle?.en?.message}
                  </p>
                )}
              </div>
            </Col>
          </Row>

          <Modal.Footer>
            <button
              className="btn cancel"
              variant="secondary"
              type="button"
              onClick={() => {
                handleShow();
              }}
            >
              <FormattedMessage id="cancel" />
            </button>
            <button type="submit" className="btn submit">
              <FormattedMessage id={selectedFeature ? "edit" : "add"} />
            </button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default FeatureModal;
