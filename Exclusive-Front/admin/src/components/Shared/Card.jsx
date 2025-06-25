import { IoEyeOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsCart3 } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { serverUrl } from "../../API/API";
import FlashSaleCounter from "../Admin/Shared/FlashSaleCounter/FlashSaleCounter";
import icStar from "../../assets/images/pngs/ic_stars.png";
import "./styles/Card.css";

const Card = ({
  product,
  handleTargetProduct,
  handleActiveModal,
  isWishlist,
}) => {
  return (
    <div className="product">
      <div className="product-icons">
        <IoEyeOutline
          className="cursor-pointer"
          onClick={() => {
            handleTargetProduct(product);
            handleActiveModal();
          }}
        />
        {isWishlist && (
          <>
            <RiDeleteBin6Line className="cursor-pointer" />
            <BsCart3 className="cursor-pointer" />
          </>
        )}
      </div>
      <NavLink to={`/products/${product?._id}`}>
        {product?.options[0]?.price?.discountPercentage > 0 && (
          <p className="discountPercentage">
            <span> {product?.options[0]?.price?.discountPercentage}%</span>
          </p>
        )}
        <div className="product-card">
          <div className="header">
            {product?.isFlashSale && (
              <FlashSaleCounter date={product?.flashSaleEndDate} />
            )}
            <img
              src={`${serverUrl}/${product?.images[0]}`}
              alt="product-img"
              className="product-img"
            />
          </div>

          <div className="content py-3">
            <h4 className="fw-bold">{product?.title.split("", 20)}.. </h4>
            <div className="d-flex mb-2 ">
              <div className="final-price fw-bold me-4  fs-5">
                $ <span>{product?.options[0].price?.finalPrice}</span>
              </div>

              {product?.options[0].price?.discountPercentage > 0 && (
                <div className="price-before-discount text-decoration-line-through fw-bold text-gray-900 fs-5">
                  ${" "}
                  <span>{product?.options[0].price?.priceBeforeDiscount}</span>
                </div>
              )}
            </div>
            <div className="d-flex align-items-center">
              <img src={icStar} alt="" />(<span>75</span>)
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default Card;
