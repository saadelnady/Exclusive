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
import StatisticsModal from "./StaticticsModal";

const OurStory = () => {
  const { section, isLoading } = useSelector(
    (state) => state.pageSectionsReducer
  );
  const { locale, formatMessage } = useIntl();
  const [show, setShow] = useState(false);
  const hsndleShow = () => setShow(!show);
  const [selectedStatisics, setSelectedStatistics] = useState(null);

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
    dispatch(
      fetchPageSection({ pageSlug: "about", sectionSlug: "statistics" })
    );
  }, []);

  useEffect(() => {
    if (section) {
      setValue("title.ar", section?.title?.ar);
      setValue("title.en", section?.title?.en);

      setValue("subTitle.ar", section?.subTitle?.ar);
      setValue("subTitle.en", section?.subTitle?.en);
    }
  }, [section]);

  const submitHandler = (updatedData) => {
    const data = { section: updatedData };
    dispatch(
      editPageSection({
        pageSlug: "about",
        sectionSlug: "statistics",
        data,
        toast,
        locale,
      })
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={`page ${styles.statistics}`}>
      <Row>
        <Col xs={12} md={6}>
          <div className="page-header">
            <div className="text">
              <h4 className="page-title">
                <FormattedMessage id="statistics" />
              </h4>
            </div>
          </div>
        </Col>
      </Row>

      <form onSubmit={handleSubmit(submitHandler)}>
        <Row>
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
              {errors.subTitle?.ar && (
                <p className="error">
                  <IcError />
                  {errors.subTitle?.ar.message}
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
              {errors.subTitle?.en && (
                <p className="error">
                  <IcError />
                  {errors.subTitle?.en.message}
                </p>
              )}
            </div>
          </Col>
          <Col xs={12}>
            <div className="page-header">
              <div className="text">
                <h4 className="page-title">
                  <FormattedMessage id="allStatistics" />
                </h4>
                <button
                  type="button"
                  className="btn submit"
                  onClick={hsndleShow}
                >
                  + <FormattedMessage id="addNewStatistic" />
                </button>
              </div>
            </div>
          </Col>
        </Row>
        <button type="submit" className="btn submit">
          <FormattedMessage id="edit" />
        </button>
      </form>
      <StatisticsModal
        register={register}
        errors={errors}
        show={show}
        hsndleShow={hsndleShow}
        selectedStatisics={selectedStatisics}
        setSelectedStatistics={setSelectedStatistics}
      />
    </div>
  );
};

export default OurStory;
