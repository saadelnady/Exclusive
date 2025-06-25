import { serverUrl } from "../../API/API";
import { useDispatch, useSelector } from "react-redux";
import { formatDateAndTime } from "../../helpers/formated_date_time";
import { HiDotsVertical } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";

import "./styles/Categories.css";
import { NavLink } from "react-router-dom";
// import Warning from "../Shared/Warning";

import {
  deleteCategory,
  fetchCategories,
} from "../../store/actions/category/categoryActions";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../Shared/loading";
import Search from "../Shared/Search";
// import { Pagination } from "../Shared/Pagination";
import { OptionButton } from "../Shared/OptionButton";
import { RiDeleteBin6Line } from "react-icons/ri";
import CustomeTitle from "../Shared/CustomeTitle";

const Categories = ({ isWarning, handleShowWarning }) => {
  const { categories, isLoading, total } = useSelector(
    (state) => state.categoryReducer
  );
  const dispatch = useDispatch();
  // ==========================================================
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // ==========================================================
  useEffect(() => {
    if (localStorage.getItem("TOKEN")) {
      dispatch(fetchCategories({ limit, page: currentPage }));
    }
  }, [currentPage, dispatch]);
  // ==========================================================
  const handleSearchCategory = (text) => {
    dispatch(fetchCategories({ limit, page: currentPage, text }));
  };
  // ==========================================================
  const [targetCategoryId, setTargetCategoryId] = useState("");
  const targetCategoryIdHanler = (categoryId) => {
    setTargetCategoryId(categoryId);
  };
  // ==========================================================
  const deleteCategoryHandler = () => {
    const payLoad = { categoryId: targetCategoryId, toast };
    dispatch(deleteCategory(payLoad));
    setTargetCategoryId("");
  };
  // ==========================================================
  const cancelHandler = () => {
    setTargetCategoryId("");
  };
  // ==========================================================
  const popupInfo = {
    message: "Are you sure to Delete this category ?",
    subMessage: "You will delete every products related to this category too",
    Icon: <RiDeleteBin6Line />,
    actionTitle: "Delete",
  };
  // ==========================================================
  return (
    <div className="categories-page">
      {/* {isWarning && (
        <Warning
          handleShowWarning={handleShowWarning}
          actionHandler={deleteCategoryHandler}
          cancelHandler={cancelHandler}
          popupInfo={popupInfo}
        />
      )} */}
      <div className="d-flex justify-content-between align-items-center flex-wrap px-3 py-2">
        <CustomeTitle title={"All categories"} />
        {/* <Search action={handleSearchCategory} /> */}
      </div>
      <div className="categories-list bg-white ">
        {isLoading ? (
          <Loading />
        ) : categories?.length > 0 ? (
          <table className="w-100 rounded text-center">
            <thead>
              <tr className="">
                <th>ID</th>
                <th>Category Image</th>
                <th>Category title</th>
                <th>created at</th>
                <th>updated at</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index}>
                  <td className="border-end">
                    {(currentPage - 1) * limit + index + 1}
                  </td>
                  <td>
                    <img
                      src={`${serverUrl}/${category?.image}`}
                      alt="categoryImage"
                      className="category-image"
                    />
                  </td>
                  <td>{category?.title}</td>
                  <td>{formatDateAndTime(category?.createdAt)}</td>
                  <td>{formatDateAndTime(category?.updatedAt)}</td>
                  <td>
                    <div className="options-wrapper">
                      <HiDotsVertical className="dotsIcon" />
                      <div className="options">
                        <NavLink
                          to={`/admin/Categories/editCategory/${category?._id}`}
                        >
                          <button className="edit">
                            <FaRegEdit /> Edit
                          </button>
                        </NavLink>
                        <OptionButton
                          actoinTitle={"Delete"}
                          actionHandler={() => {
                            targetCategoryIdHanler(category?._id);
                          }}
                          Icon={<RiDeleteBin6Line />}
                          handleShowWarning={handleShowWarning}
                          // buttonStyle
                          // styles
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="m-4 text-center fw-bold">
            there 's no categories to show
          </p>
        )}
      </div>
      {/* {categories?.length > 0 && (
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

export default Categories;
