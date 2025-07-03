import React, { useEffect, useRef, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Shared/loading";
import Table from "../Shared/Table/Index";
import DeleteIcon from "./assets/images/svgs/ic-delete.svg";
import SocialMediaModal from "./SocialMediaModal";
import {
  deleteSocial,
  fetchSocials,
} from "@/store/actions/socials/socialsActions";
import Warning from "../Shared/warning/Index";
import { toast } from "react-toastify";

const AllSocials = ({ isWarning, handleShowWarning }) => {
  const { socials, isLoading } = useSelector((state) => state.socialsReducer);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRefs = useRef({});
  const { locale } = useIntl();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState(null);

  const handleDeleteSocial = () => {
    dispatch(deleteSocial({ socialId: selectedSocial?._id, locale, toast }));
  };
  const handleClose = () => {
    setShow(!show);
    setSelectedSocial(null);
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

  useEffect(() => {
    dispatch(fetchSocials());
  }, [dispatch]);

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
          <img src={row?.image} alt="social-img" />
        </div>
      ),
    },
    {
      label: "title",
      name: "title",
      render: (row) => <div>{row?.title?.[locale]}</div>,
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
              setOpenMenuId((prev) => (prev == row._id ? null : row._id))
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
          {openMenuId == row?._id && (
            <div className="custom-dropdown">
              <button
                onClick={() => {
                  setShow(true);
                  setSelectedSocial(row);
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
                onClick={() => {
                  handleShowWarning();
                  setSelectedSocial(row);
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

  const popupInfo = {
    Icon: <DeleteIcon />,
    message: "deleteSocialMessage",
    actionTitle: "delete",
  };

  if (isLoading) return <Loading />;

  return (
    <div className="socialMedia">
      <div className="page-header">
        <div className="text">
          <h4 className="page-title">
            <FormattedMessage id="socialMediaDescription" />
          </h4>
        </div>
        <button
          className="btn addSocialMedia"
          onClick={() => {
            handleClose();
            setSelectedSocial(null);
          }}
        >
          + <FormattedMessage id="addSocialMedia" />
        </button>
      </div>
      <Table cols={cols} rows={socials} />
      <SocialMediaModal
        show={show}
        handleClose={handleClose}
        selectedSocial={selectedSocial}
        setSelectedSocial={setSelectedSocial}
      />
      {isWarning && (
        <Warning
          handleShowWarning={handleShowWarning}
          actionHandler={handleDeleteSocial}
          popupInfo={popupInfo}
        />
      )}
    </div>
  );
};

export default AllSocials;
