import { productStatus } from "../../helpers/options";
import { OptionButton } from "../Shared/OptionButton";
import { MdBlock } from "react-icons/md";

import { AiOutlineCheckCircle } from "react-icons/ai";

const ProductActionsButtons = ({
  product,
  handleShowWarning,
  currentActionHandler,
}) => {
  // =================================================================================

  return (
    <div className="options">
      {product?.status === productStatus.PENDING && (
        <div className="d-flex justify-content-end mx-4">
          <OptionButton
            actoinTitle={"Accept"}
            Icon={<AiOutlineCheckCircle />}
            handleShowWarning={handleShowWarning}
            buttonStyle="accept"
            actionHandler={() => {
              currentActionHandler("accept");
            }}
          />
          <OptionButton
            actoinTitle={"Block"}
            Icon={<MdBlock />}
            handleShowWarning={handleShowWarning}
            buttonStyle="block"
            actionHandler={() => {
              currentActionHandler("block");
            }}
          />
        </div>
      )}
      {product?.status === productStatus.ACCEPTED && (
        <OptionButton
          actoinTitle={"Block"}
          Icon={<MdBlock />}
          handleShowWarning={handleShowWarning}
          buttonStyle="block"
          actionHandler={() => {
            currentActionHandler("block");
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
            currentActionHandler("unBlock");
          }}
        />
      )}
    </div>
  );
};
export default ProductActionsButtons;
