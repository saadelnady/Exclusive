import React from "react";
import styles from "./styles/styles.module.scss";
const Loading = () => {
  return (
    <div className={styles["loading-container"]}>
      <div className={styles.loading}></div>
    </div>
  );
};
export default Loading;
