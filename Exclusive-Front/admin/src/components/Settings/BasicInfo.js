import React, { useEffect, useState } from "react";

import Loading from "../Shared/loading";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Col, Row } from "react-bootstrap";
import UploadImg from "../Shared/uploadImg/Index";
import IcError from "./assets/images/svgs/ic-error.svg";
import { postData } from "@/API/API";
import { toast } from "react-toastify";
import {
  editSettings,
  fetchSettings,
} from "@/store/actions/settings/settingsActions";
const BasicInfo = () => {
  const { settings, isLoading } = useSelector((state) => state.settingsReducer);

  const dispatch = useDispatch();

  const [logo, setLogo] = useState({
    file: null,
    preview: null,
  });
  const [favIcon, setFavIcon] = useState({
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
    data.logo = logo?.preview ? logo?.preview : null;
    data.favIcon = favIcon?.preview ? favIcon?.preview : null;

    dispatch(editSettings({ data, toast, locale }));
  };
  const handleImageChange = async (event, type) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("files", file);

    try {
      const uploadImgResponse = await postData("/api/upload", formData);
      if (type === "logo") {
        setLogo({ file, preview: uploadImgResponse?.files?.[0]?.url });
      } else if (type === "favIcon") {
        setFavIcon({ file, preview: uploadImgResponse?.files?.[0]?.url });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleRemoveImg = (type) => {
    if (type === "logo") {
      setLogo({ file: null, preview: null });
    } else if (type === "favIcon") {
      setFavIcon({ file: null, preview: null });
    }
  };

  useEffect(() => {
    dispatch(fetchSettings({ locale, toast }));
  }, []);

  useEffect(() => {
    if (settings) {
      setValue("appName.ar", settings?.appName?.ar);
      setValue("appName.en", settings?.appName?.en);
      setValue("phone", settings?.phone);
      setValue("email", settings?.email);
      setValue("address.ar", settings?.address?.ar);
      setValue("address.en", settings?.address?.en);
      setLogo({ file: null, preview: settings?.logo });
      setFavIcon({ file: null, preview: settings?.favIcon });
    }
  }, [settings]);

  if (isLoading) return <Loading />;
  return (
    <div className="basicInfo">
      <div className="page-header">
        <div className="text">
          <h4 className="page-title">
            <FormattedMessage id="editBasicSettings" />
          </h4>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs={12} md={6}>
            <UploadImg
              handleImageChange={(e) => {
                handleImageChange(e, "logo");
              }}
              selectedImg={logo}
              handleRemoveImg={() => {
                handleRemoveImg("logo");
              }}
              register={register}
              errors={errors}
              name="logo"
            />
          </Col>
          <Col xs={12} md={6}>
            <UploadImg
              handleImageChange={(e) => {
                handleImageChange(e, "favIcon");
              }}
              selectedImg={favIcon}
              handleRemoveImg={() => {
                handleRemoveImg("favIcon");
              }}
              register={register}
              errors={errors}
              name="favIcon"
            />
          </Col>
          <Col xs={12} md={6}>
            <div className="input-wrapper">
              <label className="label" htmlFor="appNameAr">
                {formatMessage({ id: "appNameAr" })} :
              </label>
              <input
                id="appNameAr"
                {...register("appName.ar", {
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
                className="special-input"
              />
              {errors.appName && (
                <p className="error">
                  <IcError />
                  {errors.appName?.ar?.message}
                </p>
              )}
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="input-wrapper">
              <label className="label" htmlFor="appNameEn">
                {formatMessage({ id: "appNameEn" })} :
              </label>

              <input
                id="appNameEn"
                dir="ltr"
                {...register("appName.en", {
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
                className="special-input"
              />
              {errors.appName && (
                <p className="error">
                  <IcError />
                  {errors.appName?.en?.message}
                </p>
              )}
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="input-wrapper">
              <label className="label" htmlFor="addressAr">
                {formatMessage({ id: "addressAr" })} :
              </label>
              <input
                id="addressAr"
                {...register("address.ar", {
                  required: formatMessage({ id: "required" }),
                  minLength: {
                    value: 10,
                    message: formatMessage({ id: "addressMinLength" }),
                  },
                  maxLength: {
                    value: 100,
                    message: formatMessage({ id: "addressMaxLength" }),
                  },
                })}
                className="special-input"
              />
              {errors.address && (
                <p className="error">
                  <IcError />
                  {errors.address?.ar?.message}
                </p>
              )}
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="input-wrapper">
              <label className="label" htmlFor="addressEn">
                {formatMessage({ id: "addressEn" })} :
              </label>

              <input
                id="addressEn"
                dir="ltr"
                {...register("address.en", {
                  required: formatMessage({ id: "required" }),
                  minLength: {
                    value: 10,
                    message: formatMessage({ id: "addressMinLength" }),
                  },
                  maxLength: {
                    value: 100,
                    message: formatMessage({ id: "addressMaxLength" }),
                  },
                })}
                className="special-input"
              />
              {errors.address && (
                <p className="error">
                  <IcError />
                  {errors.address?.en?.message}
                </p>
              )}
            </div>
          </Col>

          <Col xs={12} md={6}>
            <div className="input-wrapper">
              <label className="label" htmlFor="phone">
                {formatMessage({ id: "phone" })} :
              </label>
              <input
                id="phone"
                {...register("phone", {
                  required: formatMessage({ id: "required" }),
                  pattern: {
                    value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
                    message: formatMessage({ id: "invalidMobilePhone" }),
                  },
                })}
                className="special-input"
                type="tel"
                dir="ltr"
              />
              {errors.phone && (
                <p className="error">
                  <IcError />
                  {errors.phone.message}
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
                {...register("email", {
                  required: formatMessage({ id: "required" }),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: formatMessage({ id: "invalidEmail" }),
                  },
                })}
                className="special-input"
                type="tel"
                dir="ltr"
              />
              {errors.email && (
                <p className="error">
                  <IcError />
                  {errors.email.message}
                </p>
              )}
            </div>
          </Col>
        </Row>

        <button type="submit" className="btn submit">
          {formatMessage({ id: "edit" })}
        </button>
      </form>
    </div>
  );
};

export default BasicInfo;
