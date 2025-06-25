import React from "react";
import styles from "./styles/styles.module.scss";
import IcCamera from "./assets/images/svgs/ic-camera.svg";
import ImgPlaceholder from "./assets/images/pngs/ic-user.png";
import IcClose from "./assets/images/svgs/ic-close.svg";
import IcError from "./assets/images/svgs/ic-error.svg";

import { useIntl } from "react-intl";
const UploadImg = ({
  handleImageChange,
  selectedImg = {},
  handleRemoveImg,
  register,
  errors,
}) => {
  const { formatMessage } = useIntl();
  return (
    <div>
      <div className={styles["upload-img-container"]}>
        <label htmlFor="img" className="label">
          <img
            src={selectedImg?.preview ? selectedImg?.preview : ImgPlaceholder}
            alt="profile-img"
            className="admin-img"
          />
          <IcCamera className="ic-camera " />
          {selectedImg?.preview && (
            <button
              className="btn close"
              type="button"
              onClick={() => {
                handleRemoveImg();
              }}
            >
              <IcClose />
            </button>
          )}
        </label>
        <input
          type="file"
          id="img"
          className="d-none"
          accept="image/*"
          {...register("image", {
            required: selectedImg?.preview
              ? false
              : formatMessage({ id: "required" }),
          })}
          onChange={handleImageChange}
        />
      </div>
      {errors?.image && (
        <p className="error text-center mb-5">
          <IcError />
          {errors?.image.message}
        </p>
      )}
    </div>
  );
};

export default UploadImg;
