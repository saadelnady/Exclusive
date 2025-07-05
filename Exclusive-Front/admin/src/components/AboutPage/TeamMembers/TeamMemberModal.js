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

const TeamMemberModal = ({
  show,
  handleShow,
  append,
  selectedTeamMember,
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
    if (isObjectNotEmpty(selectedTeamMember)) {
      clearErrors();
      setSelectedImg({ file: null, preview: selectedTeamMember?.image });
      setValue("image", selectedTeamMember?.image);

      setValue("title.ar", selectedTeamMember?.title?.ar);
      setValue("title.en", selectedTeamMember?.title?.en);

      setValue("subTitle.ar", selectedTeamMember?.subTitle?.ar);
      setValue("subTitle.en", selectedTeamMember?.subTitle?.en);
    } else {
      reset();
      setSelectedImg({ file: null, preview: null });
    }
  }, [selectedTeamMember]);

  const submitHandler = (data) => {
    data.image = selectedImg?.preview ? selectedImg?.preview : null;

    if (isObjectNotEmpty(selectedTeamMember)) {
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
            id={selectedTeamMember ? "editMember" : "addNewMember"}
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
                <label className="label" htmlFor="title">
                  {formatMessage({ id: "nameAr" })} :
                </label>
                <input
                  id="title"
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
                <label className="label" htmlFor="nameEn">
                  {formatMessage({ id: "nameEn" })} :
                </label>
                <input
                  dir="ltr"
                  id="nameEn"
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
                  {formatMessage({ id: "positionAr" })} :
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
                  {formatMessage({ id: "positionEn" })} :
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
              <FormattedMessage id={selectedTeamMember ? "edit" : "add"} />
            </button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default TeamMemberModal;
