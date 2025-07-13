import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "@api/API";
import { setLocale } from "@/store/actions/language/languageActionsCreators";

import styles from "./styles/styles.module.scss";

import IcNotification from "./assets/svg/ic-notifications.svg";
import IcEnvelope from "./assets/svg/ic-envelope.svg";
import IcBurger from "./assets/svg/ic-burger.svg";
import IcUser from "./assets/svg/ic-user.svg";
import KSAFlag from "./assets/svg/KSAFlag.png";
import UnitedKingdom from "./assets/svg/kingdom.png";
import Arrow from "./assets/svg/arrow-down.svg";
import Moonicon from "./assets/svg/moon.svg";
import Sunicon from "./assets/svg/sun.svg";

import { parseCookies, setCookie } from "nookies";
import { NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { fetchAdminProfile } from "@/store/actions/admin/adminActions";

const AdminHeader = ({ handleSidebarActivation }) => {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.adminReducer);
  const { locale } = useSelector((state) => state.localeReducer);

  const [notifOpen, setNotifOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const cookies = parseCookies();
  const [dataTheme, setDataTheme] = useState(cookies["data-theme"] || "light");
  const notifRef = useRef(null);
  const msgRef = useRef(null);
  const profileRef = useRef(null);
  const langRef = useRef(null);

  useEffect(() => {
    dispatch(fetchAdminProfile());
  }, [dispatch]);
  useEffect(() => {
    const savedTheme = cookies["data-theme"];
    setDataTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newTheme = dataTheme === "light" ? "dark" : "light";
    setDataTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    setCookie(null, "data-theme", newTheme, { path: "/" });
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target))
        setNotifOpen(false);

      if (msgRef.current && !msgRef.current.contains(event.target))
        setMsgOpen(false);

      if (profileRef.current && !profileRef.current.contains(event.target))
        setProfileOpen(false);

      if (langRef.current && !langRef.current.contains(event.target))
        setLangOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const changeLanguage = (lang) => {
    dispatch(setLocale(lang));
    setLangOpen(false);
  };

  return (
    <div className={styles.header}>
      <button
        className="cursor-pointer burger-icon"
        onClick={handleSidebarActivation}
      >
        <IcBurger />
      </button>

      <div className="content">
        <div className="notifications-wrapper" ref={notifRef}>
          <div
            className="cursor-pointer"
            onClick={() => setNotifOpen(!notifOpen)}
          >
            <IcNotification />
          </div>

          {notifOpen && (
            <div className="notifications">
              <p className="dropdown-item">لا يوجد إشعارات جديدة</p>
            </div>
          )}
        </div>

        {/* Messages Dropdown */}
        <div className="messages-wrapper" ref={msgRef}>
          <div className="cursor-pointer" onClick={() => setMsgOpen(!msgOpen)}>
            <IcEnvelope />
          </div>
          {msgOpen && (
            <div className="messages">
              {/* محتوى الرسائل */}
              <p className="dropdown-item">لا توجد رسائل جديدة</p>
            </div>
          )}
        </div>

        <div
          className="d-flex align-items-center justify-content-center dark-mode-toggle"
          onClick={toggleDarkMode}
          style={{
            width: "75px",
            height: "35px",
            borderRadius: "25px",
            position: "relative",
            cursor: "pointer",
          }}
        >
          <div
            className="toggle-circle d-flex align-items-center justify-content-center"
            style={{
              width: "25px",
              height: "25px",
              borderRadius: "50%",
              backgroundColor: dataTheme === "dark" ? "#343a40" : "#f8f9fa",
              // fill: dataTheme === "dark" ? "#ffc107" : "#0d6efd",
              position: "absolute",
              transition: "all 0.4s ease",
              left: dataTheme === "dark" ? "40px" : "5px",
            }}
          >
            {dataTheme === "dark" ? (
              <Moonicon fill="#ffc107" />
            ) : (
              <Sunicon fill="#0d6efd" />
            )}
          </div>
        </div>

        <div className="languages position-relative" ref={langRef}>
          <button
            className="dropdown-toggle"
            onClick={() => setLangOpen(!langOpen)}
          >
            <div className="lang-img">
              <img src={locale === "ar" ? KSAFlag : UnitedKingdom} alt="lang" />
            </div>
            <span className="lang">
              {locale === "ar" ? "اللغة العربية" : "English"}
            </span>
            <Arrow className="arrow" />
          </button>

          {langOpen && (
            <ul className="menu dropdown-menu show">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => changeLanguage("ar")}
                  disabled={locale === "ar"}
                >
                  AR
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => changeLanguage("en")}
                  disabled={locale === "en"}
                >
                  EN
                </button>
              </li>
            </ul>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="profile-wrapper" ref={profileRef}>
          <div className="img-wrapper">
            <img
              src={admin?.image}
              alt="Admin"
              className="admin-image"
              onClick={() => setProfileOpen(!profileOpen)}
            />
          </div>

          {profileOpen && (
            <ul className="profile">
              <li>
                <NavLink to={`/profile/${admin._id}`} className="dropdown-item">
                  <IcUser />
                  <FormattedMessage id="profile" />
                </NavLink>
              </li>

              <button className="dropdown-item">الإعدادات</button>
              <button className="dropdown-item">تسجيل الخروج</button>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
