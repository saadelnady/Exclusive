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
import Table from "../../Shared/Table/Index";
import DeleteIcon from "./assets/images/svgs/ic-delete.svg";
import Warning from "@/components/Shared/warning/Index";
import TeamMemberModal from "./TeamMemberModal";

const OurStory = ({ isWarning, handleShowWarning }) => {
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [show, setShow] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const { section, isLoading } = useSelector(
    (state) => state.pageSectionsReducer
  );
  const { locale, formatMessage } = useIntl();
  const dispatch = useDispatch();
  const menuRefs = useRef({});

  const handleShow = () => {
    setShow(!show);
  };

  const handleDeleteStatistic = () => {
    if (selectedIndex) {
      remove(selectedIndex);
    }
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
    message: "deleteMemberMessage",
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
      items: [],
    },
  });
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "items",
  });

  useEffect(() => {
    dispatch(
      fetchPageSection({ pageSlug: "about", sectionSlug: "team-members" })
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
        sectionSlug: "team-members",
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
        <div className="img">
          <img src={row?.image} alt="admin-img" />
        </div>
      ),
    },
    {
      label: "name",
      name: "name",
      render: (row) => <div>{`${row?.title?.[locale]}`}</div>,
    },
    {
      label: "position",
      name: "position",
      render: (row) => <div>{`${row?.subTitle?.[locale]}`}</div>,
    },

    {
      label: "actions",
      name: "actions",
      render: (row, rowIdx) => (
        <div
          className="actions"
          ref={(el) => {
            if (el) menuRefs.current[row.id] = el;
          }}
        >
          <button
            className="actions-btn"
            type="button"
            onClick={() =>
              setOpenMenuId((prev) => (prev === row.id ? null : row.id))
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
          {openMenuId === row?.id && (
            <div className="custom-dropdown">
              <button
                type="button"
                onClick={() => {
                  handleShow();
                  setSelectedTeamMember(row);
                  setSelectedIndex(rowIdx);
                }}
              >
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
                type="button"
                onClick={() => {
                  handleShowWarning();
                  setSelectedTeamMember(row);
                  setSelectedIndex(rowIdx);
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
    <div className={`page ${styles.teamMembers}`}>
      <Row>
        <Col xs={12} md={6}>
          <div className="page-header">
            <div className="text">
              <h4 className="page-title">
                <FormattedMessage id="teamMembersTitle" />
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
                  <FormattedMessage id="teamMembersSubTitle" />
                </h4>
                <button
                  type="button"
                  className="btn submit"
                  onClick={() => {
                    handleShow();
                    setSelectedTeamMember(null);
                    setSelectedIndex(null);
                  }}
                >
                  + <FormattedMessage id="addNewMember" />
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
      <TeamMemberModal
        show={show}
        handleShow={handleShow}
        append={append}
        selectedTeamMember={selectedTeamMember}
        update={update}
        index={selectedIndex}
      />
      {isWarning && (
        <Warning
          handleShowWarning={handleShowWarning}
          actionHandler={handleDeleteStatistic}
          popupInfo={popupInfo}
        />
      )}
    </div>
  );
};

export default OurStory;
