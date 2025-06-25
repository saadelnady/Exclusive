import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "./assets/images/svgs/ic-delete.svg";

import styles from "./styles/styles.module.scss";
import { NavLink } from "react-router-dom";
import SearchBar from "../Shared/search/Index";
import Table from "../Shared/Table/Index";
import Warning from "../Shared/warning/Index";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../Shared/loading";
import { FormattedMessage, useIntl } from "react-intl";
import { Col, Row } from "react-bootstrap";
import {
  deleteSubCategory,
  fetchSubCategories,
} from "@/store/actions/subCategories/subCategoriesActions";

const SubCategories = ({ isWarning, handleShowWarning }) => {
  const { subCategories, isLoading, currentPage, totalPages } = useSelector(
    (state) => state.subCategoriesReducer
  );
  const { locale } = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubCategories({ limit: 10, page: 1, locale }));
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    if (newPage !== currentPage) {
      dispatch(fetchSubCategories({ limit: 10, page: newPage, locale }));
    }
  };

  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const menuRefs = useRef({});

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

  const handleDeleteCategory = () => {
    if (!selectedSubCategory) return;
    dispatch(
      deleteSubCategory({
        subCategoryId: selectedSubCategory?._id,
        locale,
        toast,
      })
    );
  };
  const searchHandler = (e) => {
    dispatch(fetchSubCategories({ text: e, limit: 10, page: 1, locale }));
  };
  const popupInfo = {
    Icon: <DeleteIcon />,
    message: "delete-sub-category-message",
    actionTitle: "delete",
  };
  const cols = [
    {
      label: "#",
      name: "#",
      render: (row, rowIdx) => (
        <div>
          {currentPage === 1 ? rowIdx + 1 : (currentPage - 1) * 10 + rowIdx + 1}
        </div>
      ),
    },
    {
      label: "image",
      name: "image",
      render: (row, rowIdx) => (
        <div className="subCategory-img">
          <img src={row?.image} alt="subCategory-img" />
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
              <NavLink to={`/subCategories/show/${row._id}`}>
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
              </NavLink>

              <button
                onClick={() => {
                  handleShowWarning();
                  setSelectedSubCategory(row);
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
    return (
      <div className={`page ${styles.subCategories}`}>
        <Loading />
      </div>
    );
  }
  return (
    <div className={`page ${styles.subCategories}`}>
      <div className="page-header">
        <Row>
          <Col xs={12} md={6}>
            <div className="text">
              <h4 className="page-title">
                <FormattedMessage id="subCategories" />
              </h4>
              <p className="page-description">
                <FormattedMessage id="subCategoriesDescription" />
              </p>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <NavLink to="/categories/new">
              + <FormattedMessage id="add-subCategory" />
            </NavLink>
          </Col>
          <Col xs={12} lg={5} className="me-auto">
            <SearchBar searchHandler={searchHandler} />
          </Col>
        </Row>
      </div>
      <Table cols={cols} rows={subCategories} />
      {subCategories?.length > 0 && totalPages > 1 && (
        <Pagenation
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      {isWarning && (
        <Warning
          handleShowWarning={handleShowWarning}
          actionHandler={handleDeleteCategory}
          popupInfo={popupInfo}
        />
      )}
    </div>
  );
};

export default SubCategories;
