import { MdBlock, MdOutlinePendingActions } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
export const SellerProductsActions = ({
  id,
  handleGetPendingSellerProducts,
  handleGetAcceptedSellerProducts,
  handleGetBlockedSellerProducts,
}) => {
  const pendingProducts = {
    type: "Pending products",
    Icon: <MdOutlinePendingActions />,
  };
  const acceptedProducts = {
    type: "Accepted products",
    Icon: <AiOutlineCheckCircle />,
  };
  const blockedProducts = {
    type: "Blocked products",
    Icon: <MdBlock />,
  };
  const status = [pendingProducts, acceptedProducts, blockedProducts];

  return (
    <div className="d-flex">
      {status.map((product, index) => (
        <button
          key={index}
          className={`btn mx-3 ${
            index === 0
              ? "btn-primary"
              : index === 1
              ? "btn-success"
              : "btn-danger"
          }`}
          onClick={() => {
            if (index === 0) handleGetPendingSellerProducts(id);
            else if (index === 1) handleGetAcceptedSellerProducts(id);
            else if (index === 2) handleGetBlockedSellerProducts(id);
          }}
        >
          {product.Icon}
          {product.type}
        </button>
      ))}
    </div>
  );
};
