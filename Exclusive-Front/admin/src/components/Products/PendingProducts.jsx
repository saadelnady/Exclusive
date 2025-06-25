import React, { useEffect, useState } from "react";
import Search from "../Shared/Search";
import Loading from "../Shared/loading";

import { useDispatch, useSelector } from "react-redux";
// import Warning from "../Shared/Warning";

// import { Pagination } from "../Shared/Pagination";
import { ProductsTable } from "../Shared/ProductsTable";
import {
  acceptProduct,
  blockProduct,
  fetchProducts,
} from "../../store/actions/product/productActions";
import { productStatus } from "../../helpers/options";
import CustomeTitle from "../Shared/CustomeTitle";
import { toast } from "react-toastify";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdBlock } from "react-icons/md";

const PendingProducts = ({ isWarning, handleShowWarning }) => {
  const { products, isLoading, total } = useSelector(
    (state) => state.productReducer
  );

  const dispatch = useDispatch();
  // =================================================================================
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // =================================================================================
  useEffect(() => {
    if (localStorage.getItem("TOKEN")) {
      dispatch(
        fetchProducts({
          limit,
          page: currentPage,
          status: productStatus.PENDING,
        })
      );
    }
  }, [dispatch, currentPage]);
  // =================================================================================
  const handleSearchPendingProducts = (text) => {
    dispatch(
      fetchProducts({
        limit,
        page: currentPage,
        text,
        status: productStatus.PENDING,
      })
    );
  };

  // =================================================================================
  const getPopupInfo = () => {
    if (currentAction === "accept") {
      return {
        message: "Are you sure to Accept this product?",
        Icon: <AiOutlineCheckCircle />,
        actionTitle: "Accept",
      };
    } else if (currentAction === "block") {
      return {
        message: "Are you sure to Block this product?",
        Icon: <MdBlock />,
        actionTitle: "Block",
      };
    }
    return {};
  };
  // =================================================================================

  const [targetProductId, setTargetProductId] = useState("");
  const [currentAction, setCurrentAction] = useState("");
  const targetProductIdHandler = (productId, action) => {
    setTargetProductId(productId);
    setCurrentAction(action);
  };
  const handleBlockProduct = () => {
    const payLoad = { productId: targetProductId, toast };
    dispatch(blockProduct(payLoad));
    setCurrentAction("");
  };
  const handleAcceptProduct = () => {
    const payLoad = { productId: targetProductId, toast };
    dispatch(acceptProduct(payLoad));
    setCurrentAction("");
  };
  const cancelHandler = () => {
    setTargetProductId("");
    setCurrentAction("");
  };
  // =================================================================================

  return (
    <div>
      {/* {isWarning && (
        <Warning
          handleShowWarning={handleShowWarning}
          actionHandler={
            currentAction === "accept"
              ? handleAcceptProduct
              : handleBlockProduct
          }
          popupInfo={getPopupInfo()}
          cancelHandler={cancelHandler}
        />
      )} */}
      <div className="d-flex justify-content-between align-items-center flex-wrap px-3 py-2 shadow">
        <CustomeTitle title={"All Pending products"} />
        {/* <Search action={handleSearchPendingProducts} /> */}
      </div>
      {isLoading ? (
        <Loading />
      ) : products?.length > 0 ? (
        <ProductsTable
          products={products}
          limit={limit}
          currentPage={currentPage}
          handleShowWarning={handleShowWarning}
          targetProductIdHandler={targetProductIdHandler}
        />
      ) : (
        <p className="m-4 text-center fw-bold">there 's no products to show</p>
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
  );
};
export default PendingProducts;
