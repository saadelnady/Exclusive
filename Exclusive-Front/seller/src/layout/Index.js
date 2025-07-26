import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Route, Routes } from "react-router-dom";

import SideBar from "./sidebar";
import Header from "./header";

import styles from "./styles.module.scss";
import allRoutes from "./routes.js";

const Seller = () => {
  const [isWarning, setIsWarning] = useState(false);
  const { seller } = useSelector((state) => state.sellerReducer);

  const handleShowWarning = () => {
    setIsWarning(!isWarning);
  };
  const dispatch = useDispatch();
  // =================================================================================
  const [isActive, setIsActive] = useState(false);
  const handleSidebarActivation = () => {
    setIsActive(!isActive);
  };
  // =================================================================================
  // if (!seller.isProfileComplete) {
  //   return <>hello</>;
  // }
  return (
    <div className={`${styles.layout}`}>
      <SideBar
        isActive={isActive}
        handleSidebarActivation={handleSidebarActivation}
      />
      <div className="d-flex flex-column w-100">
        <Header handleSidebarActivation={handleSidebarActivation} />
        <div className="pages">
          <Routes>
            {allRoutes(isWarning, handleShowWarning).map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default Seller;
