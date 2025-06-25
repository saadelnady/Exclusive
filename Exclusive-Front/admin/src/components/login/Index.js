import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Logo from "@/assets/images/pngs/logo.png";
import IcEye from "./assets/images/svgs/ic-eye.svg";
import IcEyeSlash from "./assets/images/svgs/ic-eyeslash.svg";
import IcError from "./assets/images/svgs/ic-error.svg";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../store/actions/admin/adminActions.js";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";

import Loading from "../Shared/loading";
import styles from "./styles/styles.module.scss";

const Index = () => {
  const { isLoading } = useSelector((state) => state.adminReducer);
  const { locale } = useSelector((state) => state.localeReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [visible, setVisible] = useState(false);

  const handleLogin = (values) => {
    const payload = { values, toast, navigate, locale };
    dispatch(adminLogin(payload));
  };

  return (
    <div className={styles.login}>
      <div className="inner">
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="content">
          <h1 className="title">
            <FormattedMessage id="wellcome" />
          </h1>
          <p className="sub-title">
            <FormattedMessage id="login-text" />
          </p>
        </div>

        <form onSubmit={handleSubmit(handleLogin)}>
          {/* Email Field */}
          <div className="input-wrapper">
            <input
              type="email"
              autoComplete="email"
              placeholder={formatMessage({ id: "email" })}
              className="special-input"
              {...register("email", {
                required: formatMessage({ id: "required" }),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: formatMessage({ id: "invalid-email" }),
                },
              })}
            />
            {errors.email && (
              <p className="error">
                <IcError />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="input-wrapper">
            <input
              type={visible ? "text" : "password"}
              autoComplete="current-password"
              placeholder={formatMessage({ id: "password" })}
              className="special-input"
              {...register("password", {
                required: formatMessage({ id: "required" }),
              })}
            />
            {visible ? (
              <button
                className="icon"
                onClick={(e) => {
                  e.preventDefault();
                  setVisible(!visible);
                }}
              >
                <IcEye />
              </button>
            ) : (
              <button
                className="icon"
                onClick={(e) => {
                  e.preventDefault();
                  setVisible(!visible);
                }}
              >
                <IcEyeSlash />
              </button>
            )}
            {errors.password && (
              <p className="error">
                <IcError />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn submit" type="submit">
              {isLoading ? <Loading /> : <FormattedMessage id="enter" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Index;
