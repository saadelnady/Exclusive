import React from "react";
import { serverUrl } from "../../API/API";
import { formatDateAndTime } from "../../helpers/formated_date_time";
import { NavLink, useParams } from "react-router-dom";
import "./styles/ProductOwnerCard.css";

const ProductOwnerCard = ({ productOwner }) => {
  const { sellerId } = useParams();
  return (
    <div className="col-12 col-md-5 col-lg-3 rounded py-3 px-4 mb-3 mb-md-0 shadow product-owner-card">
      <h2 className="mb-5 fw-bold">Seller details</h2>
      <img
        src={`${serverUrl}/${productOwner?.image}`}
        alt="ownerImg"
        className="rounded-pill object-fit-cover d-block mx-auto"
      />

      <p className="fw-bold">Name:</p>
      <p className="fs-5 mb-3">{`${productOwner?.firstName} ${productOwner?.lastName}`}</p>

      <p className="fw-bold">Email:</p>
      <p className="fs-5 mb-3">{`${productOwner?.email || "__"}`}</p>

      <p className="fw-bold">Date of Join:</p>
      <p className="fs-5 mb-3">{`${formatDateAndTime(
        productOwner?.createdAt
      )}`}</p>

      <p className="fw-bold">Mobile Phone:</p>
      <p className="fs-5 mb-3">{`${productOwner?.mobilePhone || "__"}`}</p>
      <p className="fw-bold">Address:</p>
      <p className="fs-5 mb-3">{`${productOwner?.address || "__"}`}</p>

      {!sellerId && (
        <NavLink to={`/admin/seller/${productOwner?._id}`}>
          <button className="btn btn-danger mx-auto ">More details</button>
        </NavLink>
      )}
    </div>
  );
};
export default ProductOwnerCard;
