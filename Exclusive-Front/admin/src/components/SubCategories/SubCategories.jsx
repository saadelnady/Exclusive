import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../../API/API";
import { formatDateAndTime } from "../../helpers/formated_date_time";
import { HiDotsVertical } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";

import { NavLink } from "react-router-dom";
import "./styles/subCategories.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  deleteSubCategory,
  fetchSubCategories,
} from "../../store/actions/subCategory/subCategoryActions";
// import { Pagination } from "../Shared/Pagination";
import Loading from "../Shared/loading";
// import Warning from "../Shared/Warning";

import Search from "../Shared/Search";
import { OptionButton } from "../Shared/OptionButton";
import { RiDeleteBin6Line } from "react-icons/ri";
import CustomeTitle from "../Shared/CustomeTitle";

const SubCategories = ({ isWarning, handleShowWarning }) => {
  const { isLoading, subCategories, total } = useSelector(
    (state) => state.subCategoryReducer
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
      dispatch(fetchSubCategories({ limit, page: currentPage }));
    }
  }, [currentPage, dispatch]);

  // ==========================================================

  const handleSearchSubCategory = (text) => {
    dispatch(fetchSubCategories({ limit, page: currentPage, text }));
  };
  // ===============================================
  const [targetSubCategoryId, setSubCategoryId] = useState("");
  const deleteSubCategoryHandler = () => {
    const payLoad = { subCategoryId: targetSubCategoryId, toast };
    dispatch(deleteSubCategory(payLoad));
    handleShowWarning();
    setSubCategoryId("");
  };
  // ===============================================
  const cancelHandler = () => {
    setSubCategoryId("");
  };

  const popupInfo = {
    Icon: <RiDeleteBin6Line />,
    subMessage:
      "You will delete every products related to this subCategory too",
    message: "Are you sure to Delete this subCategory ?",
    actionTitle: "Delete",
  };
  return (
    <div className="subCategories-page">
      {/* {isWarning && (
        <Warning
          handleShowWarning={handleShowWarning}
          actionHandler={deleteSubCategoryHandler}
          popupInfo={popupInfo}
          cancelHandler={cancelHandler}
        />
      )} */}
      <div className="d-flex justify-content-between align-items-center flex-wrap px-3 py-2 shadow">
        <CustomeTitle title={"All SubCategories"} />
        {/* <Search action={handleSearchSubCategory} /> */}
      </div>
      <div className="subCategories-list bg-white">
        {isLoading ? (
          <Loading />
        ) : subCategories?.length > 0 ? (
          <table className="w-100 rounded text-center">
            <thead>
              <tr className="">
                <th>ID</th>
                <th>subCategory Image</th>
                <th>subCategory title</th>
                <th>category title</th>
                <th>created at</th>
                <th>updated at</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subCategories?.map((subCategory, index) => (
                <tr key={index} className=" ">
                  <td className="border-end">
                    {(currentPage - 1) * limit + index + 1}
                  </td>
                  <td>
                    <img
                      src={`${serverUrl}/${subCategory?.image}`}
                      alt="subCategoryimage"
                      className="subCategory-image"
                    />
                  </td>
                  <td>{subCategory?.title}</td>
                  <td>{subCategory?.category?.title}</td>
                  <td>{formatDateAndTime(subCategory?.createdAt)}</td>
                  <td>{formatDateAndTime(subCategory?.updatedAt)}</td>
                  <td>
                    <div className="options-wrapper">
                      <HiDotsVertical className=" " />
                      <div className="options">
                        <NavLink
                          to={`/admin/subCategories/${subCategory?._id}`}
                        >
                          <button className="edit">
                            <FaRegEdit /> Edit
                          </button>
                        </NavLink>
                        <OptionButton
                          handleShowWarning={handleShowWarning}
                          actionHandler={() => {
                            setSubCategoryId(subCategory?._id);
                          }}
                          actoinTitle={"Delete"}
                          Icon={<RiDeleteBin6Line />}
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
            there 's no subCategories to show
          </p>
        )}
      </div>
      {/* {subCategories?.length > 0 && (
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
export default SubCategories;
