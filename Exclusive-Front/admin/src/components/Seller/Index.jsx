import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ProductsTable } from "../Shared/ProductsTable";
import ProductOwnerCard from "../Shared/ProductOwnerCard";
import { SellerProductsActions } from "./SellerProducts";
import { fetchSeller } from "../../store/actions/seller/sellerActions";
import {
  blockProduct,
  unBlockProduct,
  fetchSellerProducts,
  acceptProduct,
} from "../../store/actions/product/productActions";
import { productStatus } from "../../helpers/options";

// import Warning from "../Shared/Warning";
import Loading from "../Shared/loading";

// import { Pagination } from "../Shared/Pagination";
import CustomeTitle from "../Shared/CustomeTitle";
import { toast } from "react-toastify";
import { AiOutlineCheckCircle } from "react-icons/ai";

const Index = ({ isWarning, handleShowWarning }) => {
  const { seller } = useSelector((state) => state.sellerReducer);
  const { products, isLoading, total } = useSelector(
    (state) => state.productReducer
  );
  const { sellerId } = useParams();
  const dispatch = useDispatch();
  // =================================================================================
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(fetchSeller(sellerId));
    dispatch(fetchSellerProducts({ sellerId, status: productStatus.PENDING }));
  }, [dispatch, sellerId, currentPage]);

  const handleGetAcceptedSellerProducts = (sellerId) => {
    dispatch(fetchSellerProducts({ sellerId, status: productStatus.ACCEPTED }));
  };
  const handleGetPendingSellerProducts = (sellerId) => {
    dispatch(fetchSellerProducts({ sellerId, status: productStatus.PENDING }));
  };
  const handleGetBlockedSellerProducts = (sellerId) => {
    dispatch(fetchSellerProducts({ sellerId, status: productStatus.BLOCKED }));
  };
  // =================================================================================
  const [currentAction, setCurrentAction] = useState("");
  const [targetProductId, setTargetProductId] = useState("");
  const targetProductIdHandler = (productId, action) => {
    setTargetProductId(productId);
    setCurrentAction(action);
  };
  const handleAcceptProduct = () => {
    const payLoad = { productId: targetProductId, toast };
    dispatch(acceptProduct(payLoad));
    setCurrentAction("");
  };
  const productBlockHandler = () => {
    const payLoad = { productId: targetProductId, toast };
    dispatch(blockProduct(payLoad));
  };
  const productUnBlockHandler = () => {
    const payLoad = { productId: targetProductId, toast };
    dispatch(unBlockProduct(payLoad));
  };
  const cancelHandler = () => {
    setTargetProductId("");
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
    <div className="row m-4 justify-content-between">
      {/* {isWarning && (
        <Warning
          handleShowWarning={handleShowWarning}
          popupInfo={getPopUpInfo()}
          actionHandler={
            currentAction === "accept"
              ? handleAcceptProduct
              : currentAction === "block"
              ? productBlockHandler
              : productUnBlockHandler
          }
          cancelHandler={cancelHandler}
        />
      )} */}
      <div className="row justify-content-between align-items-center flex-wrap px-3 py-2 mb-5 shadow">
        <CustomeTitle title={"All seller products"} />
      </div>
      <ProductOwnerCard productOwner={seller} />
      <div className="col-12 col-md-7 col-lg-8 ">
        <SellerProductsActions
          id={sellerId}
          handleGetAcceptedSellerProducts={handleGetAcceptedSellerProducts}
          handleGetPendingSellerProducts={handleGetPendingSellerProducts}
          handleGetBlockedSellerProducts={handleGetBlockedSellerProducts}
        />
        {isLoading ? (
          <Loading />
        ) : products?.length > 0 ? (
          <ProductsTable
            products={products}
            currentPage={currentPage}
            limit={limit}
            handleShowWarning={handleShowWarning}
            targetProductIdHandler={targetProductIdHandler}
          />
        ) : (
          <p className="m-4">there 's no Products to show</p>
        )}
        {/* {products?.length > 0 && (
          <Pagination
            itemsPerPage={limit}
            paginate={handlePageChange}
            currentPage={currentPage}
            totalItems={total}
          />
        )} */}
      </div>
    </div>
  );
};

export default Index;
