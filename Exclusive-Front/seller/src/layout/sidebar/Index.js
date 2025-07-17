import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { sellerLogout } from "../../store/actions/seller/sellerActions";
import IcPower from "./assets/images/svgs/ic-power.svg";
import IcCircle from "./assets/images/svgs/ic-circle.svg";
import IcSettings from "./assets/images/svgs/ic-settings.svg";
import { adminLinks } from "./data";
import styles from "./styles/styles.module.scss";
import { FormattedMessage, useIntl } from "react-intl";
import { fetchSettings } from "@/store/actions/settings/settingsActions";

const SideBar = ({ isActive, handleSidebarActivation }) => {
  const { settings } = useSelector((state) => state.settingsReducer);
  const { locale } = useIntl();
  const intl = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSettings({ locale, toast }));
  }, [dispatch]);
  // بديل toggleStates
  const [activeToggleKey, setActiveToggleKey] = useState(null);

  const navigate = useNavigate();

  const handleToggle = (key) => {
    setActiveToggleKey((prevKey) => (prevKey === key ? null : key));
  };

  const handleLogOut = () => {
    const payLoad = { toast, navigate, intl };
    dispatch(sellerLogout(payLoad));
  };

  return (
    <div className={styles["sidebar-wrapper"]}>
      <div
        className={`overlay ${isActive ? "active" : ""}`}
        onClick={handleSidebarActivation}
      ></div>
      <div className={`${isActive ? "active" : ""} sidebar`}>
        <div className="logo">
          <img src={settings?.logo} alt="Logo" />
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

export default SideBar;
