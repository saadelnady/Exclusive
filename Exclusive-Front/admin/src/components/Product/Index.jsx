import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptProduct,
  blockProduct,
  fetchProduct,
  unBlockProduct,
} from "../../store/actions/product/productActions";
import { ProductCard } from "./ProductCard";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import Loading from "../Shared/loading";
// import Warning from "../Shared/Warning";
import ProductOwnerCard from "../Shared/ProductOwnerCard";
import "./styles/Product.css";

const Index = ({ isWarning, handleShowWarning }) => {
  const { product, isLoading } = useSelector((state) => state.productReducer);
  const { productOwner } = product;
  const { productId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("TOKEN")) {
      dispatch(fetchProduct(productId));
    }
  }, [dispatch, productId]);

  // ==========================================================

  const [currentAction, setCurrentAction] = useState("");
  // ========================================================================
  const currentActionHandler = (action) => {
    setCurrentAction(action);
  };
  // ========================================================================
  const handleBlockProduct = () => {
    const payLoad = { productId, toast };
    dispatch(blockProduct(payLoad));
    setCurrentAction("");
  };
  const handleAcceptProduct = () => {
    const payLoad = { productId, toast };
    dispatch(acceptProduct(payLoad));
    setCurrentAction("");
  };
  const handleUnBlockProduct = () => {
    const payLoad = { productId, toast };
    dispatch(unBlockProduct(payLoad));
  };

  // ========================================================================
  const cancelHandler = () => {
    setCurrentAction("");
  };
  // ========================================================================
  const getPopUpInfo = () => {
    if (currentAction === "accept") {
      return {
        message: "Are you sure to Accept this product?",
        Icon: <AiOutlineCheckCircle />,
        actionTitle: "Accept",
      };
    } else if (currentAction === "block") {
      return {
        message: "Are you sure to block this product?",
        Icon: <AiOutlineCheckCircle />,
        actionTitle: "Block",
      };
    } else if (currentAction === "unBlock") {
      return {
        message: "Are you sure to unBlock this product?",
        Icon: <AiOutlineCheckCircle />,
        actionTitle: "Un block",
      };
    }

    return {};
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="admin-product-page row align-items-start justify-content-evenly my-5">
          {/* {isWarning && (
            <Warning
              handleShowWarning={handleShowWarning}
              actionHandler={
                currentAction === "accept"
                  ? handleAcceptProduct
                  : currentAction === "block"
                  ? handleBlockProduct
                  : handleUnBlockProduct
              }
              popupInfo={getPopUpInfo()}
              cancelHandler={cancelHandler}
            />
          )} */}
          <ProductOwnerCard productOwner={productOwner} />
          <ProductCard
            product={product}
            handleShowWarning={handleShowWarning}
            currentActionHandler={currentActionHandler}
          />
        </div>
      )}
    </>
  );
};
export default Index;
