import {
  editAdminProfile,
  fetchAdmin,
  fetchSelectedAdminBySuperAdmin,
} from "@/store/actions/admin/adminActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Shared/loading";
import { FormattedMessage, useIntl } from "react-intl";
import { useForm } from "react-hook-form";
import styles from "./styles/styles.module.scss";
import { Col, Row } from "react-bootstrap";
import UploadImg from "../Shared/uploadImg/Index";
import IcEye from "./assets/images/svgs/ic-eye.svg";
import IcEyeSlash from "./assets/images/svgs/ic-eyeslash.svg";
import IcError from "./assets/images/svgs/ic-error.svg";
import { postData } from "@/API/API";
import { toast } from "react-toastify";

const ShowAdmin = () => {
  const { adminId } = useParams();
  const { admin, isLoading } = useSelector((state) => state.adminReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdmin({ adminId }));
  }, [adminId, dispatch]);

  const [selectedImg, setSelectedImg] = useState({
    file: null,
    preview: null,
  });

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  const { locale, formatMessage } = useIntl();

  const onSubmit = async (data) => {
    data.image = selectedImg?.preview ? selectedImg?.preview : null;
    const cleanedData = { ...data };

    if (!data.currentPassword && !data.newPassword && !data.confirmPassword) {
      delete cleanedData.currentPassword;
      delete cleanedData.newPassword;
      delete cleanedData.confirmPassword;
    }

    dispatch(editAdminProfile({ data: cleanedData, adminId, toast, locale }));
  };
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("files", file);

    try {
      const uploadImgResponse = await postData("/api/upload", formData);

      setSelectedImg({ file, preview: uploadImgResponse?.files?.[0]?.url });
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleRemoveImg = () => {
    if (selectedImg?.preview || selectedImg?.file) {
      setSelectedImg({ file: null, preview: null });
    }
  };
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  useEffect(() => {
    if (admin) {
      setSelectedImg({ file: null, preview: admin?.image });
      setValue("firstName", admin?.firstName);
      setValue("lastName", admin?.lastName);
      setValue("email", admin?.email);
      setValue("mobilePhone", admin?.mobilePhone);
    }
  }, [admin]);

  const currentPassword = watch("currentPassword");
  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  if (isLoading) return <Loading />;

  return (
    <div className={`page ${styles.addNewAdmin}`}>
      <div className="page-header">
        <div className="text">
          <h4 className="page-title">
            <FormattedMessage id="editProfile" />
          </h4>
          <p className="page-description">
            <FormattedMessage id="editProfileDescription" /> :
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs={12}>
            <UploadImg
              handleImageChange={handleImageChange}
              selectedImg={selectedImg}
              handleRemoveImg={handleRemoveImg}
              register={register}
              errors={errors}
            />
          </Col>
          <Col xs={12} md={6}>
            <div className="input-wrapper">
              <label className="label" htmlFor="firstName">
                {formatMessage({ id: "firstName" })} :
              </label>
              <input
                id="firstName"
                {...register("firstName", {
                  required: formatMessage({ id: "required" }),
                  minLength: {
                    value: 3,
                    message: formatMessage({ id: "name-min-length" }),
                  },
                  maxLength: {
                    value: 20,
                    message: formatMessage({ id: "name-max-length" }),
                  },
                })}
                className="special-input"
              />
              {errors.firstName && (
                <p className="error">
                  <IcError />
                  {errors.firstName.message}
                </p>
              )}
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="input-wrapper">
              <label className="label" htmlFor="lastName">
                {formatMessage({ id: "lastName" })} :
              </label>

              <input
                id="lastName"
                {...register("lastName", {
                  required: formatMessage({ id: "required" }),
                  minLength: {
                    value: 3,
                    message: formatMessage({ id: "name-min-length" }),
                  },
                  maxLength: {
                    value: 20,
                    message: formatMessage({ id: "name-max-length" }),
                  },
                })}
                className="special-input"
              />
              {errors.lastName && (
                <p className="error">
                  <IcError />
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="input-wrapper">
              <label className="label" htmlFor="email">
                {formatMessage({ id: "email" })} :
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
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
          </Col>
          <Col xs={12} md={6}>
            <div className="input-wrapper">
              <label className="label" htmlFor="mobilePhone">
                {formatMessage({ id: "mobilePhone" })} :
              </label>
              <input
                id="mobilePhone"
                {...register("mobilePhone", {
                  required: formatMessage({ id: "required" }),
                  pattern: {
                    value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
                    message: formatMessage({ id: "invalid-mobilePhone" }),
                  },
                })}
                className="special-input"
                type="tel"
                dir="ltr"
              />
              {errors.mobilePhone && (
                <p className="error">
                  <IcError />
                  {errors.mobilePhone.message}
                </p>
              )}
            </div>
          </Col>

          <Col xs={12} md={6}>
            <div className="input-wrapper">
              <label className="label" htmlFor="currentPassword">
                {formatMessage({ id: "currentPassword" })} :
              </label>
              <input
                id="currentPassword"
                {...register("currentPassword", {
                  validate: (value) => {
                    if ((newPassword || confirmPassword) && !value) {
                      return formatMessage({ id: "required" });
                    }
                    if (value && value.length < 9) {
                      return formatMessage({ id: "password-length" });
                    }
                    return true;
                  },
                })}
                className="special-input"
                type={showPassword.current ? "text" : "password"}
              />
              <button
                className="icon"
                type="button"
                onClick={() => togglePassword("current")}
              >
                {showPassword.current ? <IcEyeSlash /> : <IcEye />}
              </button>
              {errors.currentPassword && (
                <p className="error">
                  <IcError />
                  {errors.currentPassword.message}
                </p>
              )}
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="input-wrapper">
              <label className="label" htmlFor="newPassword">
                {formatMessage({ id: "newPassword" })} :
              </label>
              <input
                {...register("newPassword", {
                  validate: (value) => {
                    if ((currentPassword || confirmPassword) && !value) {
                      return formatMessage({ id: "required" });
                    }
                    if (value && value.length < 9) {
                      return formatMessage({ id: "password-length" });
                    }
                    return true;
                  },
                })}
                className="special-input"
                type={showPassword.new ? "text" : "password"}
              />
              <button
                className="icon"
                type="button"
                onClick={() => togglePassword("new")}
              >
                {showPassword.new ? <IcEyeSlash /> : <IcEye />}
              </button>
              {errors.newPassword && (
                <p className="error">
                  <IcError />
                  {errors.newPassword.message}
                </p>
              )}
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="input-wrapper">
              <label className="label" htmlFor="confirmPassword">
                {formatMessage({ id: "confirmPassword" })} :
              </label>
              <input
                id="confirmPassword"
                {...register("confirmPassword", {
                  validate: (value) => {
                    if ((currentPassword || newPassword) && !value) {
                      return formatMessage({ id: "required" });
                    }
                    if (value && value.length < 9) {
                      return formatMessage({ id: "password-length" });
                    }
                    if (value && value !== newPassword) {
                      return formatMessage({ id: "password-not-match" });
                    }
                    return true;
                  },
                })}
                className="special-input"
                type={showPassword.confirm ? "text" : "password"}
              />
              <button
                className="icon"
                type="button"
                onClick={() => togglePassword("confirm")}
              >
                {showPassword.confirm ? <IcEyeSlash /> : <IcEye />}
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

        <button type="submit" className="btn submit">
          {formatMessage({ id: "editAdmin" })}
        </button>
      </form>
    </div>
  );
};

export default ShowAdmin;
