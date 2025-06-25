import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Shared/loading";
import { FormattedMessage, useIntl } from "react-intl";
import styles from "./styles/styles.module.scss";

import { editUser, fetchUser } from "@/store/actions/user/userActions";
import { userStatus } from "@/helpers/roles";
import { handleImageLink } from "@/helpers/checkers";
import { toast } from "react-toastify";
import BlockUserModal from "./blockUserModal";
const ShowUser = () => {
  const { userId } = useParams();
  const { user, isLoading } = useSelector((state) => state.userReducer);
  const { locale } = useIntl();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);

  useEffect(() => {
    dispatch(fetchUser({ userId }));
  }, [userId, dispatch]);

  const handleBlockUser = (status) => {
    if (status === "block") {
      setShow(true);
    } else {
      dispatch(
        editUser({
          userId,
          data: {
            status: userStatus?.VERIFIED,
            blockReason: "",
          },
          toast,
          locale,
          navigate,
        })
      );
    }
  };
  const onSubmit = (data) => {
    dispatch(
      editUser({
        userId,
        data: {
          status: userStatus?.BLOCKED,
          blockReason: data?.blockReason,
        },
        toast,
        locale,
        navigate,
      })
    );
  };
  if (isLoading) return <Loading />;
  return (
    <div className={`page ${styles.user}`}>
      <div className="page-header">
        <div className="text">
          <h4 className="page-title">
            <FormattedMessage id="userDetailsTitle" />
          </h4>
          <p className="page-description">
            <FormattedMessage id="userDetailsDescription" />
          </p>
        </div>
      </div>
      <div className="table-wrapper">
        <table className="custom-table">
          <tbody>
            <tr>
              <th>
                <FormattedMessage id="image" />
              </th>
              <td>
                <img
                  src={handleImageLink(user?.image || "")}
                  alt="User"
                  width="80"
                />
              </td>
            </tr>
            <tr>
              <th>
                <FormattedMessage id="name" />
              </th>
              <td>{`${user?.firstName} ${user?.lastName}`} </td>
            </tr>

            <tr>
              <th>
                <FormattedMessage id="email" />
              </th>
              <td>{user?.email}</td>
            </tr>
            <tr>
              <th>
                <FormattedMessage id="phone" />
              </th>
              <td>{user?.mobilePhone}</td>
            </tr>
            <tr>
              <th>
                <FormattedMessage id="address" />
              </th>
              <td>{user?.address || "-"}</td>
            </tr>

            <tr>
              <th>
                <FormattedMessage id="isBlocked" />
              </th>
              <td>
                {user?.status === userStatus.BLOCKED ? (
                  <div className="d-flex align-items-center gap-5">
                    <FormattedMessage id="yes" />
                    <button
                      className="btn block-btn"
                      type="button"
                      onClick={() => handleBlockUser("unblock")}
                    >
                      <FormattedMessage id="unblock" />
                    </button>
                  </div>
                ) : (
                  <div className="d-flex align-items-center gap-5">
                    <FormattedMessage id="no" />
                    <button
                      className="btn block-btn"
                      type="button"
                      onClick={() => {
                        handleBlockUser("block");
                      }}
                    >
                      <FormattedMessage id="block" />
                    </button>
                  </div>
                )}
              </td>
            </tr>
            {user?.blockReason && user?.status === userStatus.BLOCKED && (
              <tr>
                <th>
                  <FormattedMessage id="blockReason" />
                </th>
                <td>{user?.blockReason || "-"}</td>
              </tr>
            )}
            <tr>
              <th>
                <FormattedMessage id="createdAt" />
              </th>
              <td>
                {new Date(user?.createdAt).toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {" - "}
                {new Date(user?.createdAt).toLocaleTimeString("ar-EG", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
            </tr>
            <tr>
              <th>
                <FormattedMessage id="updatedAt" />
              </th>
              <td>
                {new Date(user?.updatedAt).toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {" - "}
                {new Date(user?.updatedAt).toLocaleTimeString("ar-EG", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <BlockUserModal
        show={show}
        handleClose={handleClose}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default ShowUser;
