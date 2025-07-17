import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import IcEye from "./assets/images/svgs/ic-eye.svg";
import IcEyeSlash from "./assets/images/svgs/ic-eyeslash.svg";
import IcError from "./assets/images/svgs/ic-error.svg";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";

import Loading from "../Shared/loading";
import styles from "./styles/styles.module.scss";
import { fetchSettings } from "@/store/actions/settings/settingsActions";
import { sellerRegister } from "@/store/actions/seller/sellerActions";
import { Col, Row } from "react-bootstrap";

const Index = () => {
  const { isLoading } = useSelector((state) => state.sellerReducer);
  const { locale } = useSelector((state) => state.localeReducer);
  const { settings } = useSelector((state) => state.settingsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [visible, setVisible] = useState({
    password: false,
    confirm: false,
  });
  const RegisterHandler = (values) => {
    const payload = { values, toast, navigate, locale };
    dispatch(sellerRegister(payload));
  };
  useEffect(() => {
    dispatch(fetchSettings({ toast, locale }));
  }, []);
  return (
    <div className={styles.register}>
      <div className="inner">
        <div className="logo">
          <img src={settings?.logo} alt="logo" />
        </div>
        <div className="content">
          <h1 className="title">
            <FormattedMessage id="registerTitle" />
          </h1>
          <p className="sub-title">
            <FormattedMessage id="registerSubTitle" />
          </p>
        </div>

        <form onSubmit={handleSubmit(RegisterHandler)}>
          <Row>
            <Col xs={12} lg={6}>
              {/* name Field */}
              <div className="input-wrapper">
                <input
                  type="name"
                  autoComplete="name"
                  placeholder={formatMessage({ id: "name" })}
                  className="special-input"
                  {...register("name", {
                    required: formatMessage({ id: "required" }),
                    minLength: {
                      value: 3,
                      message: formatMessage({ id: "nameMinLength" }),
                    },
                    maxLength: {
                      value: 20,
                      message: formatMessage({ id: "nameMaxLength" }),
                    },
                  })}
                />
                {errors.name && (
                  <p className="error">
                    <IcError />
                    {errors.name.message}
                  </p>
                )}
              </div>
            </Col>
            <Col xs={12} lg={6}>
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
                      message: formatMessage({ id: "invalidEmail" }),
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
            </Col>
            <Col xs={12} lg={6}>
              {/* mobilePhone Field */}
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder={formatMessage({ id: "phone" })}
                  className="special-input"
                  {...register("mobilePhone", {
                    required: formatMessage({ id: "required" }),
                    minLength: {
                      value: 10,
                      message: formatMessage({ id: "phoneMinLength" }),
                    },
                    pattern: {
                      value: /^[0-9]+$/, // يتحقق من أن الرقم يحتوي على أرقام فقط
                      message: formatMessage({ id: "invalidPhone" }),
                    },
                  })}
                />
                {errors.mobilePhone && (
                  <p className="error">
                    <IcError />
                    {errors.mobilePhone.message}
                  </p>
                )}
              </div>
            </Col>
            <Col xs={12} lg={6}>
              {/* Password Field */}
              <div className="input-wrapper">
                <input
                  type={visible.password ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder={formatMessage({ id: "password" })}
                  className="special-input"
                  {...register("password", {
                    required: formatMessage({ id: "required" }),
                  })}
                />
                <button
                  className="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    setVisible((prev) => ({
                      ...prev,
                      password: !prev.password,
                    }));
                  }}
                >
                  {visible.password ? <IcEyeSlash /> : <IcEye />}
                </button>
                {errors.password && (
                  <p className="error">
                    <IcError />
                    {errors.password.message}
                  </p>
                )}
              </div>
            </Col>
            <Col xs={12} lg={6}>
              {/* Confirm Password Field */}
              <div className="input-wrapper">
                <input
                  type={visible.confirm ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder={formatMessage({ id: "confirmPassword" })}
                  className="special-input"
                  {...register("confirmPassword", {
                    required: formatMessage({ id: "required" }),
                    validate: (value) =>
                      value === getValues("password") ||
                      formatMessage({ id: "passwordsNotMatched" }),
                  })}
                />
                <button
                  className="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    setVisible((prev) => ({ ...prev, confirm: !prev.confirm }));
                  }}
                >
                  {visible.confirm ? <IcEyeSlash /> : <IcEye />}
                </button>
                {errors.confirmPassword && (
                  <p className="error">
                    <IcError />
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </Col>
          </Row>

          {/* Submit Button */}
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn submit" type="submit">
              {isLoading ? (
                <Loading />
              ) : (
                <FormattedMessage id="registerTitle" />
              )}
            </button>
          </div>

          <div className="haveAnAccount">
            <p>
              <FormattedMessage id="haveAnAccount" />
            </p>
            <NavLink to="/login">
              <FormattedMessage id="login" />
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Index;
