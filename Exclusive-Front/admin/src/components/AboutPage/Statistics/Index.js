import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
import styles from "./styles/styles.module.scss";
import { useFieldArray, useForm } from "react-hook-form";
import IcError from "./assets/images/svgs/ic-error.svg";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  editPageSection,
  fetchPageSection,
} from "@/store/actions/pageSections/actions";
import Loading from "@/components/Shared/loading";
import StatisticsModal from "./StaticticsModal";
import Table from "../../Shared/Table/Index";
import DeleteIcon from "./assets/images/svgs/ic-delete.svg";
import Warning from "@/components/Shared/warning/Index";

const OurStory = ({ isWarning, handleShowWarning }) => {
  const [selectedStatisti, setSelectedStatistic] = useState(null);
  const [show, setShow] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const { section, isLoading } = useSelector(
    (state) => state.pageSectionsReducer
  );
  const { locale, formatMessage } = useIntl();
  const dispatch = useDispatch();
  const menuRefs = useRef({});

  const handleShow = () => setShow(!show);

  const handleDeleteFeature = () => {
    console.log("daad");
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      const clickedOutsideAll = Object.keys(menuRefs.current).every((key) => {
        const ref = menuRefs.current[key];
        return ref && !ref.contains(e.target);
      });

      if (clickedOutsideAll) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const popupInfo = {
    Icon: <DeleteIcon />,
    message: "deleteStatisicMessage",
    actionTitle: "delete",
  };

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: { ar: "", en: "" },
      subTitle: { ar: "", en: "" },
      items: [
        {
          title: "",
          subTitle: { ar: "", en: "" },
          image: "",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

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

      setValue("items", section?.items);
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

  const cols = [
    {
      label: "#",
      name: "#",
      render: (row, rowIdx) => <div>{rowIdx + 1}</div>,
    },
    {
      label: "image",
      name: "image",
      render: (row, rowIdx) => (
        <div className="admin-img">
          <img src={row?.image} alt="admin-img" />
        </div>
      ),
    },
    {
      label: "title",
      name: "title",
      render: (row) => <div>{`${row?.title}`}</div>,
    },
    {
      label: "subTitle",
      name: "subTitle",
      render: (row) => <div>{`${row?.subTitle?.[locale]}`}</div>,
    },

    {
      label: "actions",
      name: "actions",
      render: (row) => (
        <div
          className="actions"
          ref={(el) => {
            if (el) menuRefs.current[row._id] = el;
          }}
        >
          <button
            className="actions-btn"
            onClick={() =>
              setOpenMenuId((prev) => (prev === row._id ? null : row._id))
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <circle cx="8" cy="3" r="1.5" />
              <circle cx="8" cy="8" r="1.5" />
              <circle cx="8" cy="13" r="1.5" />
            </svg>
          </button>
          {openMenuId === row?._id && (
            <div className="custom-dropdown">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="bi bi-eye"
                  viewBox="0 0 24 24"
                >
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>

                <FormattedMessage id="view" />
              </button>

              <button
                onClick={() => {
                  handleShowWarning();
                  setSelectedStatistic(row);
                }}
              >
                <DeleteIcon />
                <FormattedMessage id="delete" />
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

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
                  onClick={handleShow}
                >
                  + <FormattedMessage id="addNewStatistic" />
                </button>
              </div>
            </div>
          </Col>
        </Row>
        <Table cols={cols} rows={fields} />
        <button type="submit" className="btn submit">
          <FormattedMessage id="edit" />
        </button>
      </form>
      <StatisticsModal
        register={register}
        errors={errors}
        show={show}
        handleShow={handleShow}
        append={append}
      />
      {isWarning && (
        <Warning
          handleShowWarning={handleShowWarning}
          actionHandler={handleDeleteFeature}
          popupInfo={popupInfo}
        />
      )}
    </div>
  );
};

export default OurStory;
