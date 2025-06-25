import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../Shared/Table/Index";
import { FormattedMessage, useIntl } from "react-intl";
import Loading from "../Shared/loading";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import styles from "./styles/styles.module.scss";
import Warning from "../Shared/warning/Index";
import Pagenation from "../Shared/pagenation/Index";
import SearchBar from "../Shared/search/Index";
import { Col, Row } from "react-bootstrap";
import DeleteIcon from "./assets/images/svgs/ic-delete.svg";
import { fetchUsers, deleteUser } from "@/store/actions/user/userActions";
import { handleImageLink } from "@/helpers/checkers";

const AllUsers = ({ isWarning, handleShowWarning }) => {
  const { users, isLoading, currentPage, totalPages } = useSelector(
    (state) => state.userReducer
  );
  const { locale } = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers({ limit: 10, page: 1 }));
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    if (newPage !== currentPage) {
      dispatch(fetchUsers({ limit: 10, page: newPage }));
    }
  };

  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
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

  const handleDeleteUser = () => {
    if (!selectedUser) return;
    dispatch(
      deleteUser({
        userId: selectedUser?._id,
        locale,
        toast,
      })
    );
  };
  const searchHandler = (e) => {
    dispatch(fetchUsers({ text: e, limit: 10, page: 1, locale }));
  };
  const popupInfo = {
    Icon: <DeleteIcon />,
    message: "delete-user-message",
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
        <div className="user-img">
          <img src={handleImageLink(row?.image)} alt="admin-img" />
        </div>
      ),
    },
    {
      label: "name",
      name: "name",
      render: (row) => <div>{`${row?.firstName} ${row?.lastName}`}</div>,
    },
    {
      label: "email",
      name: "email",
      render: (row) => <div>{`${row?.email}`}</div>,
    },
    {
      label: "phone",
      name: "phone",
      render: (row) => <div>{`${row?.mobilePhone}`}</div>,
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
              <NavLink to={`/users/show/${row._id}`}>
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

              {/* <button
                onClick={() => {
                  handleShowWarning();
                  setSelectedUser(row);
                }}
              >
                <DeleteIcon />
                <FormattedMessage id="delete" />
              </button> */}
            </div>
          )}
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className={`page ${styles.users}`}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={`page ${styles.users}`}>
      <div className="page-header">
        <Row>
          <Col xs={12} md={6}>
            <div className="text">
              <h4 className="page-title">
                <FormattedMessage id="usersTitle" />
              </h4>
              <p className="page-description">
                <FormattedMessage id="usersDescription" />
              </p>
            </div>
          </Col>
          {/* <Col xs={12} md={4}>
            <NavLink to="/users/new">
              + <FormattedMessage id="add-admin" />
            </NavLink>
          </Col> */}
          <Col xs={12} lg={5} className="me-auto">
            <SearchBar searchHandler={searchHandler} />
          </Col>
        </Row>
      </div>
      <Table cols={cols} rows={users} />
      {users?.length > 0 && totalPages > 1 && (
        <Pagenation
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      {isWarning && (
        <Warning
          handleShowWarning={handleShowWarning}
          actionHandler={handleDeleteUser}
          popupInfo={popupInfo}
        />
      )}
    </div>
  );
};

export default AllUsers;
