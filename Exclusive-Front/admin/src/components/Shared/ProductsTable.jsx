import { serverUrl } from "../../API/API";
import { formatDateAndTime } from "../../helpers/formated_date_time";
import { HiDotsVertical } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import "./styles/ProductsTable.css";
import { FaEye } from "react-icons/fa";
import { productStatus } from "../../helpers/options";
import { OptionButton } from "./OptionButton";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdBlock } from "react-icons/md";

export const ProductsTable = ({
  products,
  currentPage,
  limit,
  handleShowWarning,
  targetProductIdHandler,
}) => {
  return (
    <div className="mt-4 mx-md-4 rounded shadow">
      <table className="col-12 rounded text-center products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>product Image</th>
            <th>product title</th>
            <th>created at</th>
            <th>updated at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => (
            <tr key={index}>
              <td className="border-end">
                {(currentPage - 1) * limit + index + 1}
              </td>
              <td>
                <img
                  src={`${serverUrl}/${product?.images[0]}`}
                  alt="productImage"
                  className="product-image"
                />
              </td>
              <td>{product?.title}</td>
              <td>{formatDateAndTime(product?.createdAt)}</td>
              <td>{formatDateAndTime(product?.updatedAt)}</td>

              <td>
                <div className="options-wrapper">
                  <HiDotsVertical className="dotsIcon" />
                  <div className="options">
                    <NavLink to={`/admin/products/${product?._id}`}>
                      <button className=" d-flex justify-content-between w-100 option view d-block">
                        <FaEye />
                        View
                      </button>
                    </NavLink>
                    {product?.status === productStatus.PENDING ||
                    product?.status === productStatus.ACCEPTED ? (
                      <OptionButton
                        actoinTitle={"Block"}
                        Icon={<MdBlock />}
                        handleShowWarning={handleShowWarning}
                        buttonStyle="block"
                        actionHandler={() => {
                          targetProductIdHandler(product?._id, "block");
                        }}
                      />
                    ) : null}
                    {product?.status === productStatus.PENDING && (
                      <OptionButton
                        actoinTitle={"Accept"}
                        Icon={<AiOutlineCheckCircle />}
                        handleShowWarning={handleShowWarning}
                        buttonStyle="accept"
                        actionHandler={() => {
                          targetProductIdHandler(product?._id, "accept");
                        }}
                      />
                    )}

                    {product?.status === productStatus.BLOCKED && (
                      <OptionButton
                        actoinTitle={"UnBlock"}
                        Icon={<MdBlock />}
                        handleShowWarning={handleShowWarning}
                        buttonStyle="block"
                        actionHandler={() => {
                          targetProductIdHandler(product?._id, "unBlock");
                        }}
                      />
                    )}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
