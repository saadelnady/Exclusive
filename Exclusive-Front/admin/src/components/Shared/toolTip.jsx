import React, { useState } from "react";
import "./styles/ToolTip.css";
import { MdError } from "react-icons/md";
const ToolTip = ({ text }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="tooltip-container  ">
      <div
        className="tooltip-trigger"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <MdError className="fs-3 me-2" />
      </div>
      {showTooltip && <div className="tooltip">{text}</div>}
    </div>
  );
};

export default ToolTip;
