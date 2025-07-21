import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import { FormattedMessage, useIntl } from "react-intl";
import UploadFile2 from "../Shared/UploadFile/UploadFile2/Index";
import { postData } from "@/API/API";
import { useDispatch, useSelector } from "react-redux";
import {
  editSellerProfile,
  fetchSellerProfile,
} from "@/store/actions/seller/sellerActions";
import UploadImg from "../Shared/UploadFile/UploadFile1/Index";
import IcError from "./assets/images/svgs/ic-error.svg";
import { toast } from "react-toastify";

const SellerDocumentsForm = () => {
  const { seller, isLoading } = useSelector((state) => state.sellerReducer);
  const { locale } = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSellerProfile());
  }, [dispatch]);
  const [key, setKey] = useState("step1");
  const [selectedFrontId, setSelectedFrontId] = useState({
    file: null,
    preview: null,
  });
  const [selectedBackId, setSelectedBackId] = useState({
    file: null,
    preview: null,
  });

  const [selectedImg, setSelectedImg] = useState({
    file: null,
    preview: null,
  });

  const [selectedCommercialRegister, setSelectedCommercialRegister] = useState({
    file: null,
    preview: null,
  });
  const [selectedTaxCard, setSelectedTaxCard] = useState({
    file: null,
    preview: null,
  });
  const [selectedOtherDocs, setSelectedOtherDocs] = useState({
    file: null,
    preview: null,
  });

  const { formatMessage } = useIntl();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
    trigger,
  } = useForm();

  useEffect(() => {
    if (seller) {
      setSelectedImg({ file: null, preview: seller?.image });
      setValue("name", seller?.name);
      setValue("email", seller?.email);
      setValue("mobilePhone", seller?.mobilePhone);
    }
  }, [seller]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const fieldName = event.target.name;
    console.log("fieldName", fieldName);

    const formData = new FormData();
    formData.append("files", file);

    try {
      const uploadImgResponse = await postData("/api/upload", formData);
      const imageUrl = uploadImgResponse?.files?.[0]?.url;
      console.log("imageUrl", imageUrl);

      if (fieldName === "frontId") {
        setSelectedFrontId({ file, preview: imageUrl });
      } else if (fieldName === "backId") {
        setSelectedBackId({ file, preview: imageUrl });
      } else if (fieldName === "image") {
        setSelectedImg({ file, preview: imageUrl });
      } else if (fieldName === "commercialRegister") {
        setSelectedCommercialRegister({ file, preview: imageUrl });
      } else if (fieldName === "taxCard") {
        setSelectedTaxCard({ file, preview: imageUrl });
      } else if (fieldName === "otherDocs") {
        setSelectedOtherDocs({ file, preview: imageUrl });
      }
    } catch (error) {
      console.log("Upload error:", error);
    }
  };

  const handleRemoveImg = (selectedFileToRemove) => {
    if (selectedFileToRemove === "frontId") {
      setSelectedFrontId({ file: null, preview: null });
    } else if (selectedFileToRemove === "backId") {
      setSelectedBackId({ file: null, preview: null });
    } else if (selectedFileToRemove === "image") {
      setSelectedImg({ file: null, preview: null });
    } else if (selectedFileToRemove === "commercialRegister") {
      setSelectedCommercialRegister({ file: null, preview: null });
    } else if (selectedFileToRemove === "taxCard") {
      setSelectedTaxCard({ file: null, preview: null });
    } else if (selectedFileToRemove === "otherDocs") {
      setSelectedOtherDocs({ file: null, preview: null });
    }
  };
  console.log("errors", errors);

  const onSubmit = (data) => {
    data.image = selectedImg?.preview ? selectedImg?.preview : null;
    data.frontId = selectedFrontId?.preview ? selectedFrontId?.preview : null;
    data.backId = selectedBackId?.preview ? selectedBackId?.preview : null;
    data.commercialRegister = selectedCommercialRegister?.preview
      ? selectedCommercialRegister?.preview
      : null;
    data.taxCard = selectedTaxCard?.preview ? selectedTaxCard?.preview : null;
    data.otherDocs = selectedOtherDocs?.preview
      ? selectedOtherDocs?.preview
      : null;

    dispatch(
      editSellerProfile({
        values: { officialDocuments: data, ...data },
        sellerId: seller?._id,
        toast,
        locale,
      })
    );
  };

  const goToStep = async (nextStep) => {
    const isValid = await trigger([
      "name",
      "email",
      "address",
      "mobilePhone",
      "nationalId",
      "image",
    ]);
    if (isValid) setKey(nextStep);
  };

  return (
    <div className={`page ${styles.completeProfile}`}>
      <Container>
        <div className="page-header">
          <div className="text">
            <h4 className="page-title">
              <FormattedMessage id="completeProfile" />
            </h4>
            <p className="page-description">
              <FormattedMessage id="completeProfileDescription" /> :
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs
            activeKey={key}
            onSelect={(k) => k === "step2" && goToStep("step2")}
          >
            <Tab eventKey="step1" title={<FormattedMessage id="sellerInfo" />}>
              <Row>
                <Col xs={12}>
                  <UploadImg
                    handleImageChange={handleImageChange}
                    selectedImg={selectedImg}
                    handleRemoveImg={() => handleRemoveImg("image")}
                    register={register}
                    errors={errors}
                    name="image"
                  />
                </Col>
                <Col xs={12} md={6}>
                  <div className="input-wrapper">
                    <label className="label" htmlFor="name">
                      {formatMessage({ id: "name" })} :
                    </label>

                    <input
                      id="name"
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
                      className="special-input"
                    />
                    {errors.name && (
                      <p className="error">
                        <IcError />
                        {errors.name.message}
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
                      dir="ltr"
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
                          value:
                            /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
                          message: formatMessage({ id: "invalidMobilePhone" }),
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
                    <label>
                      <FormattedMessage id="nationalId" /> :{" "}
                    </label>
                    <input
                      dir="ltr"
                      className="special-input"
                      {...register("nationalId", {
                        required: {
                          value: true,
                          message: formatMessage({ id: "required" }),
                        },
                      })}
                    />
                    {errors.nationalId?.message && (
                      <p className="error">
                        <IcError />
                        {errors.nationalId?.message}
                      </p>
                    )}
                  </div>
                </Col>
                <Col xs={12} md={6}>
                  <div className="input-wrapper">
                    <label>
                      <FormattedMessage id="address" /> :
                    </label>
                    <textarea
                      className="special-input textarea"
                      {...register("address", {
                        required: {
                          value: true,
                          message: formatMessage({ id: "required" }),
                        },
                      })}
                    />
                    {errors.address && (
                      <p className="error">
                        <IcError />
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>

              <button
                type="button"
                className="btn submit"
                onClick={() => goToStep("step2")}
              >
                التالى
              </button>
            </Tab>

            <Tab
              eventKey="step2"
              title={<FormattedMessage id="sellerDocs" />}
              disabled={key === "step1"}
            >
              <Row>
                <Col xs={12} md={6}>
                  <UploadFile2
                    handleFileChange={handleImageChange}
                    selectedFile={selectedFrontId}
                    handleRemoveImg={() => handleRemoveImg("frontId")}
                    register={register}
                    errors={errors}
                    name="frontId"
                  />
                </Col>
                <Col xs={12} md={6}>
                  <UploadFile2
                    handleFileChange={handleImageChange}
                    selectedFile={selectedBackId}
                    handleRemoveImg={() => handleRemoveImg("backId")}
                    register={register}
                    errors={errors}
                    name="backId"
                  />
                </Col>
                <Col xs={12} md={6}>
                  <UploadFile2
                    handleFileChange={handleImageChange}
                    selectedFile={selectedCommercialRegister}
                    handleRemoveImg={() =>
                      handleRemoveImg("commercialRegister")
                    }
                    register={register}
                    errors={errors}
                    name="commercialRegister"
                  />
                </Col>
                <Col xs={12} md={6}>
                  <UploadFile2
                    handleFileChange={handleImageChange}
                    selectedFile={selectedTaxCard}
                    handleRemoveImg={() => handleRemoveImg("taxCard")}
                    register={register}
                    errors={errors}
                    name="taxCard"
                  />
                </Col>
                <Col xs={12} md={6}>
                  <UploadFile2
                    handleFileChange={handleImageChange}
                    selectedFile={selectedOtherDocs}
                    handleRemoveImg={() => handleRemoveImg("otherDocs")}
                    register={register}
                    errors={errors}
                    name="otherDocs"
                  />
                </Col>
              </Row>

              <button type="submit" className="btn btn-success">
                إرسال
              </button>
            </Tab>
          </Tabs>
        </form>
      </Container>
    </div>
  );
};

export default SellerDocumentsForm;
