import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Shared/loading";
import { FormattedMessage, useIntl } from "react-intl";
import styles from "./styles/styles.module.scss";

import { sellerStatus } from "@/helpers/roles";
import { handleImageLink } from "@/helpers/checkers";
import { toast } from "react-toastify";
import BlockUserModal from "./blockSellerModal";
import {
  editSellerProfile,
  fetchSeller,
} from "@/store/actions/seller/sellerActions";

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

  const handleSellerAccount = (status) => {
    if (status === "block") {
      setShow(true);
    } else {
      dispatch(
        editSellerProfile({
          sellerId,
          values: {
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
      editSellerProfile({
        sellerId,
        values: {
          status: sellerStatus?.BLOCKED,
          blockReason: data?.blockReason,
        },
        toast,
        locale,
        navigate,
      })
    );
    handleClose();
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
              <td>{`${seller?.name}`} </td>
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
                <FormattedMessage id="accountStatus" />
              </th>
              <td>
                {seller?.status === sellerStatus.PENDING_APPROVAL && (
                  <div className="d-flex align-items-center gap-5">
                    <FormattedMessage id="pending" />
                    <button
                      className="btn block-btn"
                      type="button"
                      onClick={() => handleSellerAccount("unblock")}
                    >
                      <FormattedMessage id="verify" />
                    </button>
                  </div>
                )}
                {seller?.status === sellerStatus.VERIFIED && (
                  <div className="d-flex align-items-center gap-5">
                    <FormattedMessage id="VERIFIED" />

                    <button
                      className="btn block-btn"
                      type="button"
                      onClick={() => {
                        handleSellerAccount("block");
                      }}
                    >
                      <FormattedMessage id="block" />
                    </button>
                  </div>
                )}
                {seller?.status === sellerStatus.BLOCKED && (
                  <div className="d-flex align-items-center gap-5">
                    <FormattedMessage id="BLOCKED" />
                    <button
                      className="btn block-btn"
                      type="button"
                      onClick={() => handleSellerAccount("unblock")}
                    >
                      <FormattedMessage id="unblock" />
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
            <tr>
              <th>
                <FormattedMessage id="dateOfBirth" />
              </th>
              <td>
                {new Date(seller?.dateOfBirth).toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
            </tr>

            <tr>
              <th>
                <FormattedMessage id="nationalId" />
              </th>
              <td>{seller?.nationalId || "-"}</td>
            </tr>

            <tr>
              <th>
                <FormattedMessage id="storeName" />
              </th>
              <td>{seller?.storeName || "-"}</td>
            </tr>
            {/* 
            <tr>
              <th>
                <FormattedMessage id="paymentMethod" />
              </th>
              <td>{seller?.paymentInfo?.method || "-"}</td>
            </tr>

           {seller?.paymentInfo?.instapay && (
              <>
                <tr>
                  <th>
                    <FormattedMessage id="instapayAccountName" />
                  </th>
                  <td>{seller.paymentInfo.instapay.accountName || "-"}</td>
                </tr>
                <tr>
                  <th>
                    <FormattedMessage id="instapayPhone" />
                  </th>
                  <td>{seller.paymentInfo.instapay.phone || "-"}</td>
                </tr>
              </>
            )} */}

            <tr>
              <th>
                <FormattedMessage id="officialDocuments" />
              </th>
              <td>
                <ul className="list-unstyled d-flex flex-column gap-2">
                  <li>
                    <strong>
                      <FormattedMessage id="frontId" />:
                    </strong>{" "}
                    <a
                      href={seller?.officialDocuments?.frontId}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FormattedMessage id="view" />
                    </a>
                  </li>
                  <li>
                    <strong>
                      <FormattedMessage id="backId" />:
                    </strong>{" "}
                    <a
                      href={seller?.officialDocuments?.backId}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FormattedMessage id="view" />
                    </a>
                  </li>
                  <li>
                    <strong>
                      <FormattedMessage id="commercialRegister" />:
                    </strong>{" "}
                    <a
                      href={seller?.officialDocuments?.commercialRegister}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FormattedMessage id="view" />
                    </a>
                  </li>
                  <li>
                    <strong>
                      <FormattedMessage id="taxCard" />:
                    </strong>{" "}
                    <a
                      href={seller?.officialDocuments?.taxCard}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FormattedMessage id="view" />
                    </a>
                  </li>
                  <li>
                    <strong>
                      <FormattedMessage id="otherDocs" />:
                    </strong>{" "}
                    <a
                      href={seller?.officialDocuments?.otherDocs}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FormattedMessage id="view" />
                    </a>
                  </li>
                </ul>
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
