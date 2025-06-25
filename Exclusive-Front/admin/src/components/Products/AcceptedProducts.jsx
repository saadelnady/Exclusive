import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  blockProduct,
  fetchProducts,
} from "../../store/actions/product/productActions";
// import { Pagination } from "../Shared/Pagination";
// import Warning from "../Shared/Warning";
import Search from "../Shared/Search";
import Loading from "../Shared/loading";

import { ProductsTable } from "../Shared/ProductsTable";
import { productStatus } from "../../helpers/options";
import CustomeTitle from "../Shared/CustomeTitle";
import { toast } from "react-toastify";
import { MdBlock } from "react-icons/md";

const AcceptedProducts = ({ isWarning, handleShowWarning }) => {
  const { products, isLoading, total } = useSelector(
    (state) => state.productReducer
  );
  const dispatch = useDispatch();

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
          status: productStatus.ACCEPTED,
        })
      );
    }
  }, [dispatch, currentPage]);

  const handleSearchAcceptedProducts = (text) => {
    dispatch(
      fetchProducts({
        limit,
        page: currentPage,
        text,
        status: productStatus.ACCEPTED,
      })
    );
  };
  // =================================================================================

  const [targetProductId, setTargetProductId] = useState("");
  const targetProductIdHandler = (productId) => {
    setTargetProductId(productId);
  };
  const productBlockHandler = () => {
    const payLoad = { productId: targetProductId, toast };
    dispatch(blockProduct(payLoad));
  };
  const cancelHandler = () => {
    setTargetProductId("");
  };

  const popupInfo = {
    message: "Are you sure to block this product ?",
    Icon: <MdBlock />,
    actionTitle: "Block",
  };

  return (
    <div>
      {/* {isWarning && (
        <Warning
          handleShowWarning={handleShowWarning}
          actionHandler={productBlockHandler}
          popupInfo={popupInfo}
          cancelHandler={cancelHandler}
        />
      )} */}

      <div className="d-flex justify-content-between align-items-center flex-wrap px-3 py-2 shadow">
        <CustomeTitle title={"All Accepted products"} />
        {/* <Search action={handleSearchAcceptedProducts} /> */}
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
        <p className="m-4 text-center fw-bold">there 's no Products to show</p>
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
export default AcceptedProducts;
