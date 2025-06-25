import styles from "./styles/styles.module.scss";
import { FormattedMessage } from "react-intl";
const Warning = ({ handleShowWarning, actionHandler, popupInfo }) => {
  const { Icon, actionTitle, message, subMessage } = popupInfo;
  return (
    <div className={styles["warning-layout"]}>
      <div className="warning-container">
        {message && (
          <h3 className="warning-messge ">
            <FormattedMessage id={message} />
          </h3>
        )}
        {subMessage && (
          <p className="warning-sub-messge ">
            {<FormattedMessage id={message} />}
          </p>
        )}
        <div className="btns">
          <button
            onClick={() => {
              actionHandler();
              handleShowWarning();
            }}
            className="btn action"
          >
            {Icon}
            <FormattedMessage id={actionTitle} />
          </button>
          <button
            onClick={() => {
              handleShowWarning();
            }}
            className="btn cancel"
          >
            <FormattedMessage id="cancel" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Warning;
