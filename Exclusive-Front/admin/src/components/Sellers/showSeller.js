import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Shared/loading";
import { FormattedMessage, useIntl } from "react-intl";
import styles from "./styles/styles.module.scss";

import { sellerStatus } from "@/helpers/roles";
import { handleImageLink } from "@/helpers/checkers";
import { toast } from "react-toastify";
import BlockUserModal from "./blockUserModal";
import { fetchSeller } from "@/store/actions/seller/sellerActions";
const ShowSeller = () => {
  const { sellerId } = useParams();
  const { seller, isLoading } = useSelector((state) => state.sellerReducer);
  const { locale } = useIntl();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);

  useEffect(() => {
    dispatch(fetchSeller({ sellerId }));
  }, [sellerId, dispatch]);

  const handleBlockSeller = (status) => {
    if (status === "block") {
      setShow(true);
    } else {
      dispatch(
        editS({
          sellerId,
          data: {
            status: sellerStatus?.VERIFIED,
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
        sellerId,
        data: {
          status: sellerStatus?.BLOCKED,
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
    <div className={`page ${styles.seller}`}>
      <div className="page-header">
        <div className="text">
          <h4 className="page-title">
            <FormattedMessage id="sellerDetailsTitle" />
          </h4>
          <p className="page-description">
            <FormattedMessage id="sellerDetailsDescription" />
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
                <div className="seller-img">
                  <img
                    src={handleImageLink(seller?.image || "")}
                    alt="User"
                    width="80"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>
                <FormattedMessage id="name" />
              </th>
              <td>{`${seller?.firstName} ${seller?.lastName}`} </td>
            </tr>

            <tr>
              <th>
                <FormattedMessage id="email" />
              </th>
              <td>{seller?.email}</td>
            </tr>
            <tr>
              <th>
                <FormattedMessage id="phone" />
              </th>
              <td>{seller?.mobilePhone}</td>
            </tr>
            <tr>
              <th>
                <FormattedMessage id="address" />
              </th>
              <td>{seller?.address || "-"}</td>
            </tr>

            <tr>
              <th>
                <FormattedMessage id="isBlocked" />
              </th>
              <td>
                {seller?.status === sellerStatus.BLOCKED ? (
                  <div className="d-flex align-items-center gap-5">
                    <FormattedMessage id="yes" />
                    <button
                      className="btn block-btn"
                      type="button"
                      onClick={() => handleBlockSeller("unblock")}
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
                        handleBlockSeller("block");
                      }}
                    >
                      <FormattedMessage id="block" />
                    </button>
                  </div>
                )}
              </td>
            </tr>
            {seller?.blockReason && seller?.status === sellerStatus.BLOCKED && (
              <tr>
                <th>
                  <FormattedMessage id="blockReason" />
                </th>
                <td>{seller?.blockReason || "-"}</td>
              </tr>
            )}
            <tr>
              <th>
                <FormattedMessage id="createdAt" />
              </th>
              <td>
                {new Date(seller?.createdAt).toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {" - "}
                {new Date(seller?.createdAt).toLocaleTimeString("ar-EG", {
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
                {new Date(seller?.updatedAt).toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {" - "}
                {new Date(seller?.updatedAt).toLocaleTimeString("ar-EG", {
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

export default ShowSeller;
