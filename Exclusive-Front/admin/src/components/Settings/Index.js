import React, { useEffect, useState } from "react";

import { FormattedMessage, useIntl } from "react-intl";

import styles from "./styles/styles.module.scss";

import BasicInfo from "./BasicInfo";
import SocialMedia from "./SocialMedia";

const Settings = () => {
  const [activeSettings, setActiveSettings] = useState("basicInfo");
  const handleActiveSettings = (settings) => {
    setActiveSettings(settings);
  };

  return (
    <div className={`page ${styles.settings}`}>
      <div className="page-header">
        <div className="text">
          <h1 className="fw-bold mb-4 page-title">
            <FormattedMessage id="settings" />
          </h1>
        </div>

        <div className="settings-tabs">
          <button
            className={`btn ${activeSettings === "basicInfo" ? "active" : ""}`}
            onClick={() => handleActiveSettings("basicInfo")}
          >
            <FormattedMessage id="basicInfo" />
          </button>
          <button
            className={`btn ${
              activeSettings === "socialMedia" ? "active" : ""
            }`}
            onClick={() => handleActiveSettings("socialMedia")}
          >
            <FormattedMessage id="socialMedia" />
          </button>
        </div>
      </div>
      {activeSettings === "basicInfo" && <BasicInfo />}
      {activeSettings === "socialMedia" && <SocialMedia />}
    </div>
  );
};

export default Settings;
