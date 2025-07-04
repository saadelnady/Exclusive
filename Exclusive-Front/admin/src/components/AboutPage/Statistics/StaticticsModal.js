import { postData } from "@/API/API";
import UploadImg from "@/components/Shared/uploadImg/Index";
import React, { useEffect, useState } from "react";
import { Modal, Col, Row } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
import IcClose from "./assets/images/svgs/ic-close.svg";
import styles from "./styles/styles.module.scss";
import { isObjectNotEmpty } from "@/helpers/checkers";
import IcError from "./assets/images/svgs/ic-error.svg";

const StatisticsModal = ({
  register,
  errors,
  show,
  handleShow,
  selectedStatisics,
  setSelectedStatistics,
  append,
  index,
}) => {
  const [selectedImg, setSelectedImg] = useState({ file: null, preview: null });
  const { locale, formatMessage } = useIntl();
  useEffect(() => {
    if (isObjectNotEmpty(selectedStatisics)) {
      setValue("image", selectedStatisics?.image);
      setSelectedImg({ file: null, preview: selectedStatisics?.image });
      setValue("title.ar", selectedStatisics?.title.ar);
      setValue("title.en", selectedStatisics?.title.en);
      setValue("subTitle.ar", selectedStatisics?.subTitle.ar);
      setValue("subTitle.en", selectedStatisics?.subTitle.en);
    } else {
      // reset();
      setSelectedImg({ file: null, preview: null });
    }
  }, [selectedStatisics && selectedStatisics?._id]);
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

  const submitHandler = () => {};
  return (
    <Modal
      size="lg"
      show={show}
      onHide={() => {
        handleShow();
        setSelectedStatistics(null);
      }}
      centered
      className={styles.statisticsModal}
    >
      <Modal.Header>
        <Modal.Title>
          <FormattedMessage
            id={selectedStatisics ? "editStatistic" : "addNewStatistic"}
          />
        </Modal.Title>
        <button
          onClick={() => {
            handleShow();
            setSelectedStatistics(null);
          }}
        >
          <IcClose />
        </button>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={submitHandler}>
          <Row>
            <UploadImg
              handleImageChange={handleImageChange}
              selectedImg={selectedImg}
              handleRemoveImg={handleRemoveImg}
              register={register}
              errors={errors}
              name="image"
            />
            <Col xs={12}>
              <div className="input-wrapper">
                <label className="label" htmlFor="title">
                  {formatMessage({ id: "title" })} :
                </label>
                <input
                  id="title"
                  {...register(`items.${index}.title`, {
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
                <label className="label" htmlFor="subTitleAr">
                  {formatMessage({ id: "subTitleAr" })} :
                </label>
                <input
                  id="subTitleAr"
                  dir="rtl"
                  {...register(`items.${index}.subTitle.ar`, {
                    required: formatMessage({ id: "required" }),
                  })}
                  className="special-input"
                />
                {`${errors}.items.${index}.subTitle.ar` && (
                  <p className="error">
                    <IcError />
                    {`${errors}.items.${index}.subTitle.ar.message`}
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
                  {...register(`items.${index}.subTitle.en`, {
                    required: formatMessage({ id: "required" }),
                  })}
                  className="special-input"
                />
                {`${errors}.items.${index}.subTitle.en` && (
                  <p className="error">
                    <IcError />
                    {`${errors}.items.${index}.subTitle.en.message`}
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
                setSelectedStatistics(null);
              }}
            >
              <FormattedMessage id="cancel" />
            </button>
            <button type="submit" className="btn submit">
              <FormattedMessage id={selectedStatisics ? "edit" : "add"} />
            </button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default StatisticsModal;
