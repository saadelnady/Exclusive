import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import styles from "./styles/styles.module.scss";

import IcClose from "./assets/images/svgs/ic-close.svg";
import IcError from "./assets/images/svgs/ic-error.svg";
import UploadImg from "../Shared/uploadImg/Index";
import { postData } from "@/API/API";
import { useDispatch } from "react-redux";
import {
  editSocial,
  postAddSocial,
} from "@/store/actions/socials/socialsActions";
import { toast } from "react-toastify";
import { isObjectNotEmpty } from "@/helpers/checkers";

const SocialMediaModal = ({
  show,
  handleClose,
  selectedSocial,
  setSelectedSocial,
}) => {
  const { formatMessage, locale } = useIntl();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [selectedImg, setSelectedImg] = useState({
    file: null,
    preview: null,
  });

  useEffect(() => {
    if (isObjectNotEmpty(selectedSocial)) {
      setValue("image", selectedSocial?.image);
      setSelectedImg({ file: null, preview: selectedSocial?.image });
      setValue("title.ar", selectedSocial?.title.ar);
      setValue("title.en", selectedSocial?.title.en);
      setValue("link", selectedSocial?.link);
    } else {
      reset();
      setSelectedImg({ file: null, preview: null });
    }
  }, [selectedSocial && selectedSocial?._id]);

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

  const onSubmit = (data) => {
    data.image = selectedImg?.preview ? selectedImg?.preview : null;

    if (isObjectNotEmpty(selectedSocial)) {
      dispatch(
        editSocial({
          data,
          toast,
          locale,
          socialId: selectedSocial?._id,
        })
      );
    } else {
      dispatch(postAddSocial({ data, toast, locale }));
    }
    handleClose();
  };

  return (
    <div>
      <Modal
        size="lg"
        show={show}
        onHide={() => {
          handleClose();
          setSelectedSocial(null);
        }}
        centered
        className={styles.socialModal}
      >
        <Modal.Header>
          <Modal.Title>
            <FormattedMessage
              id={selectedSocial ? "editSocialMedia" : "addSocialMedia"}
            />
          </Modal.Title>
          <button
            onClick={() => {
              handleClose();
              setSelectedSocial(null);
            }}
          >
            <IcClose />
          </button>
        </Modal.Header>

        <Modal.Body>
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
              <Col xs={12}>
                <div className="input-wrapper">
                  <label className="label" htmlFor="link">
                    {formatMessage({ id: "link" })} :
                  </label>
                  <input
                    id="link"
                    dir="ltr"
                    {...register("link", {
                      required: formatMessage({ id: "required" }),
                    })}
                    className="special-input"
                  />
                  {errors.link && (
                    <p className="error">
                      <IcError />
                      {errors.link?.message}
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
                  handleClose();
                  setSelectedSocial(null);
                }}
              >
                <FormattedMessage id="cancel" />
              </button>
              <button type="submit" className="btn submit">
                <FormattedMessage id={selectedSocial ? "edit" : "add"} />
              </button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SocialMediaModal;
