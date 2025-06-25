import React, { useState } from "react";

const Tabs = ({ tabs, Id }) => {
  const [active, setActive] = useState(false);
  const handleActive = () => {
    setActive(!active);
  };
  const action = () => {};
  return (
    <div>
      {tabs?.map((tab, index) => (
        <button
          className={`btn ${active ? "active" : ""}`}
          key={index}
          onClick={action()}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
