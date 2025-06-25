import { useState } from "react";
import { useDispatch } from "react-redux";

import { Route, Routes } from "react-router-dom";

import AdminSideBar from "./sidebar";
import AdminHeader from "./header";

import styles from "./styles.module.scss";
import allRoutes from "./routes.js";

const Admin = () => {
  const [isWarning, setIsWarning] = useState(false);

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

  return (
    <div className={`${styles["admin-layout"]}`}>
      <AdminSideBar
        isActive={isActive}
        handleSidebarActivation={handleSidebarActivation}
      />
      <div className="d-flex flex-column w-100">
        <AdminHeader handleSidebarActivation={handleSidebarActivation} />
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
export default Admin;
