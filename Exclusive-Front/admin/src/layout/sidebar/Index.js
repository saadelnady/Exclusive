import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import { adminLogout } from "../../store/actions/admin/adminActions";
import IcPower from "./assets/images/svgs/ic-power.svg";
import IcCircle from "./assets/images/svgs/ic-circle.svg";
import IcSettings from "./assets/images/svgs/ic-settings.svg";
import { adminLinks } from "./data";
import styles from "./styles/styles.module.scss";
import { FormattedMessage } from "react-intl";
import Logo from "@/assets/images/pngs/logo.png";

const AdminSideBar = ({ isActive, handleSidebarActivation }) => {
  const { admin } = useSelector((state) => state.adminReducer);

  // بديل toggleStates
  const [activeToggleKey, setActiveToggleKey] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggle = (key) => {
    setActiveToggleKey((prevKey) => (prevKey === key ? null : key));
  };

  const handleLogOut = () => {
    const payLoad = { toast, navigate, role: "ADMIN" };
    dispatch(adminLogout(payLoad));
  };

  return (
    <div className={styles["sidebar-wrapper"]}>
      <div
        className={`overlay ${isActive ? "active" : ""}`}
        onClick={handleSidebarActivation}
      ></div>
      <div className={`${isActive ? "active" : ""} sidebar`}>
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>

        <div className="Admin-links">
          <div className="btns">
            <NavLink to="/settings">
              <IcSettings />
            </NavLink>
            <button onClick={handleLogOut}>
              <IcPower />
            </button>
          </div>

          <ul className="main-nav">
            {adminLinks.map((link) => {
              const isActive = activeToggleKey === link.toggleKey;

              return (
                <li
                  key={link.id}
                  className="nav-item"
                  onClick={() => link.toggleKey && handleToggle(link.toggleKey)}
                >
                  <NavLink to={link.to}>
                    {link.icon}
                    <FormattedMessage id={link.title} />
                    {link.children && (
                      <span className={`${isActive ? "active" : ""} arrow`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M6 4l4 4-4 4"
                            stroke="currentColor"
                            stroke-width="2"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                  </NavLink>

                  {link.children && (
                    <ul className={`sub-nav ${isActive ? "active" : ""}`}>
                      {link.children.map((child) => (
                        <li key={child.id}>
                          <NavLink to={child.to} className="child-link">
                            <IcCircle />
                            <span>
                              <FormattedMessage id={child.title} />
                            </span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
