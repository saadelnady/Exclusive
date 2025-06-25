import { FaXmark } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { toast } from "react-toastify";
import { serverUrl } from "../../API/API";
import { clearProduct } from "../../store/actions/product/productActionsCreators";
import { fetchProduct } from "../../store/actions/product/productActions";
import { addToCart } from "../../store/actions/cart/cartActions";
import { showToast } from "../../helpers/toast_helper";
import Counter from "./Counter";
import Loading from "./loading";
import Colors from "../Product/Colors";
import Size from "../Product/Size";
import "./styles/ProductModal.css";
import { addToWishList } from "../../store/actions/wishList/wishListActions";

const ProductModal = ({ productId, handleActiveModal }) => {
  const { product, isLoading } = useSelector((state) => state.productReducer);
  const { admin, isLoggedIn } = useSelector((state) => state.adminReducer);
  const [activeColor, setActiveColor] = useState(null);
  const [activeSize, setActiveSize] = useState(null);
  const [counter, setCounter] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const targetOption = product?.options?.find(
    (option) => option.color === activeColor && option.size === activeSize
  );
  const increaseHandler = () => {
    setCounter(counter + 1);
  };
  const decreaseHandler = () => {
    setCounter(counter - 1);
    if (counter <= 0) {
      setCounter(0);
    } else {
      setCounter(counter - 1);
    }
  };

  const handleSizeActive = (size) => {
    setActiveSize(size);
  };

  const handleColorActive = (color) => {
    setActiveColor(color);
  };

  const addProductToCartHandler = (productId) => {
    if (!isLoggedIn) {
      showToast(toast, "You have to login first", "error");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
    if (counter > targetOption?.stockCount) {
      showToast(toast, "you have reached the stock count", "error");
    } else {
      const data = {
        admin: admin?._id,
        productId,
        optionId: targetOption?._id,
        newSelectedCount: counter,
      };
      dispatch(addToCart(data, toast));
    }
  };
  const addProductToWishListHandler = (productId) => {
    if (!isLoggedIn) {
      showToast(toast, "You have to login first", "error");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      const data = {
        adminId: admin?._id,
        productId,
        optionId: targetOption?._id,
      };
      dispatch(addToWishList({ data, toast }));
    }
  };

  const filteredSizesByColor = product?.options?.filter(
    (option) => option.color === activeColor
  );

  useEffect(() => {
    if (product && product?.options?.length > 0) {
      setActiveColor(product?.options[0]?.color);
      setActiveSize(product?.options[0]?.size);
    }
  }, [product, product?.options]);
  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [dispatch, productId]);

  const handleMessageSubmit = () => {
    navigate("/messages");
  };
  return (
    <div className="product-modal">
      <div className="bg-light p-3 rounded col-9">
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <Loading />
          </div>
        ) : (
          <>
            <FaXmark
              onClick={() => {
                handleActiveModal();
                dispatch(clearProduct());
              }}
              className="fs-2 cursor-pointer d-block xmark ms-auto"
            />
            <div
              className="row justify-content-center justify-content-md-evenly flex-wrap gap-5"
              style={{ overflow: "auto", height: "600px" }}
            >
              <div className="col-12 col-sm-4">
                <div style={{ height: "400px" }}>
                  {product &&
                    product?.images &&
                    product?.images?.length > 0 && (
                      <img
                        src={`${serverUrl}/${product?.images[0]}`}
                        alt="product-img"
                        className="w-100 h-100 object-fit-contain"
                      />
                    )}
                </div>
                <div className="d-flex align-items-center justify-content-sm-between mt-3 col-12 flex-wrap">
                  <button
                    className="btn btn-danger submit"
                    onClick={handleMessageSubmit}
                  >
                    Send message
                    <BiMessageRoundedDetail className="fs-2" />
                  </button>
                  <NavLink to={`/sellerpage/${product?.productOwner?._id}`}>
                    <button className="btn submit-reverse">
                      <img
                        src={`${serverUrl}/${product?.productOwner?.image}`}
                        alt="seller-img"
                        className="rounded-pill seller-img"
                      />
                      view seller
                    </button>
                  </NavLink>
                </div>
              </div>

              <div className="col-12 col-sm-6 ">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  <h3>{product?.title}</h3>
                  <p>
                    {product?.category?.title} / {product?.subCategory?.title}{" "}
                  </p>
                </div>
                <p className="my-3 fs-5 border-top border-bottom py-5">
                  {product?.description}
                </p>
                <div className="d-flex mb-3">
                  {targetOption && (
                    <p className="fw-bold fs-4 me-4">
                      {targetOption?.price?.finalPrice} $
                    </p>
                  )}
                  {targetOption?.price?.discountValue !== null ? (
                    <del className="fw-bold fs-4 text-danger">
                      {targetOption?.price?.priceBeforeDiscount} $
                    </del>
                  ) : null}
                </div>

                <Colors
                  options={product?.options}
                  activeColor={activeColor}
                  handleColorActive={handleColorActive}
                />
                <Size
                  options={filteredSizesByColor}
                  handleSizeActive={handleSizeActive}
                  activeSize={activeSize}
                />
                <Counter
                  counter={counter}
                  decreaseHandler={decreaseHandler}
                  increaseHandler={increaseHandler}
                />
                <div className="d-flex mt-4">
                  <button
                    className="btn submit-reverse me-4"
                    onClick={() => {
                      addProductToCartHandler(product?._id);
                    }}
                  >
                    Add to cart
                    <BsCart3 className="cursor-pointer ms-2 fs-3" />
                  </button>

                  <button
                    className="btn btn-danger submit-reverse"
                    onClick={() => {
                      addProductToWishListHandler(product?._id);
                    }}
                  >
                    <CiHeart className="cursor-pointer fs-3" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
