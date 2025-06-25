import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  unBlockProduct,
} from "../../store/actions/product/productActions";

// import Warning from "../Shared/Warning";
import Search from "../Shared/Search";
import Loading from "../Shared/loading";
// import { Pagination } from "../Shared/Pagination";
import { ProductsTable } from "../Shared/ProductsTable";
import { productStatus } from "../../helpers/options";
import { MdBlock } from "react-icons/md";
import { toast } from "react-toastify";
import CustomeTitle from "../Shared/CustomeTitle";

const BlockedProducts = ({ isWarning, handleShowWarning }) => {
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
          limit: limit,
          page: currentPage,
          status: productStatus.BLOCKED,
        })
      );
    }
  }, [dispatch, currentPage]);
  // =================================================================================

  const handleSearchBlockedProducts = (text) => {
    dispatch(
      fetchProducts({
        limit,
        page: currentPage,
        text,
        status: productStatus.BLOCKED,
      })
    );
  };
  // =================================================================================

  const [targetProductId, setTargetProductId] = useState("");
  const targetProductIdHandler = (productId) => {
    setTargetProductId(productId);
  };
  const productUnBlockHandler = () => {
    const payLoad = { productId: targetProductId, toast };
    dispatch(unBlockProduct(payLoad));
  };
  const cancelHandler = () => {
    setTargetProductId("");
  };

  const popupInfo = {
    message: "Are you sure to UnBlock this product ?",
    Icon: <MdBlock />,
    actionTitle: "UnBlock",
  };
  // =================================================================================

  return (
    <div>
      {/* {isWarning && (
        <Warning
          handleShowWarning={handleShowWarning}
          actionHandler={productUnBlockHandler}
          popupInfo={popupInfo}
          cancelHandler={cancelHandler}
        />
      )} */}
      <div className="d-flex justify-content-between align-items-center flex-wrap px-3 py-2 shadow">
        <CustomeTitle title={"All blocked products"} />
        {/* <Search action={handleSearchBlockedProducts} /> */}
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

export default BlockedProducts;
