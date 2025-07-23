import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Col, Container, Row, Tab, Nav, Button } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "../Shared/UploadFile/UploadFile1/Index";
import UploadFile2 from "../Shared/UploadFile/UploadFile2/Index";
import { postData } from "@/API/API";
import {
  editSellerProfile,
  fetchSellerProfile,
} from "@/store/actions/seller/sellerActions";
import { toast } from "react-toastify";
import styles from "./styles/styles.module.scss";
import IcError from "./assets/images/svgs/ic-error.svg";

const SellerDocumentsForm = () => {
  const { seller } = useSelector((state) => state.sellerReducer);
  const { locale, formatMessage } = useIntl();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("step1");

  // حالة اكت完成 كل خطوة
  const [completed, setCompleted] = useState({
    step1: false,
    step2: false,
    step3: false,
  });

  const [images, setImages] = useState({
    image: { preview: null, file: null },
    frontId: { preview: null, file: null },
    backId: { preview: null, file: null },
    commercialRegister: { preview: null, file: null },
    taxCard: { preview: null, file: null },
    otherDocs: { preview: null, file: null },
  });

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchSellerProfile());
  }, [dispatch]);

  useEffect(() => {
    if (seller) {
      setImages((prev) => ({
        ...prev,
        image: { preview: seller.image },
        frontId: { preview: seller?.officialDocuments?.frontId },
        backId: { preview: seller?.officialDocuments?.backId },
        commercialRegister: {
          preview: seller?.officialDocuments?.commercialRegister,
        },
        taxCard: { preview: seller?.officialDocuments?.taxCard },
        otherDocs: { preview: seller?.officialDocuments?.otherDocs },
      }));

      setValue("name", seller.name);
      setValue("email", seller.email);
      setValue("mobilePhone", seller.mobilePhone);
      setValue("nationalId", seller.nationalId);
      setValue("address", seller.address);
      const formattedDate = new Date(seller?.dateOfBirth);
      if (isNaN(formattedDate.getTime())) {
        setValue("dateOfBirth", "");
      } else {
        const sellerDate = new Date(seller.dateOfBirth);
        const formattedDate = sellerDate?.toISOString().split("T")[0];
        setValue("dateOfBirth", formattedDate);
      }
    }
  }, [seller, setValue]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    if (!file) return;

    const formData = new FormData();
    formData.append("files", file);

    try {
      const res = await postData("/api/upload", formData);
      const url = res?.files?.[0]?.url;
      if (url) {
        setImages((prev) => ({ ...prev, [name]: { file, preview: url } }));
      }
    } catch (err) {
      toast.error(formatMessage({ id: "uploadError" }));

      console.error("Upload error:", err);
    }
  };

  const handleRemoveImg = (name) => {
    setImages((prev) => ({ ...prev, [name]: { preview: null, file: null } }));
  };

  const getPreview = (name) => images[name]?.preview || null;

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      image: getPreview("image"),
      frontId: getPreview("frontId"),
      backId: getPreview("backId"),
      commercialRegister: getPreview("commercialRegister"),
      taxCard: getPreview("taxCard"),
      otherDocs: getPreview("otherDocs"),
    };

    dispatch(
      editSellerProfile({
        values: { officialDocuments: finalData, ...finalData },
        sellerId: seller?._id,
        toast,
        locale,
      })
    );
  };

  const validateStep1 = () =>
    trigger([
      "name",
      "email",
      "mobilePhone",
      "address",
      "nationalId",
      "dateOfBirth",
    ]);
  const validateStep2 = () =>
    trigger([
      "storeName",
      "cardHolderName",
      "cardLast4Digits",
      "cardBrand",
      "expiryDate",
    ]);

  // زر "التالي"
  const handleNext = async () => {
    const valid = await validateStep1();
    const validStep2 = await validateStep2();
    if (!valid || !validStep2) {
      // ممكن توست لو حبيت
      // toast.error(formatMessage({ id: "fixErrors" }));
      return;
    }

    setCompleted((c) => ({ ...c, step1: true }));
    setActiveTab("step2");
  };

  // زر "السابق"
  const handlePrevious = () => {
    setActiveTab("step1");
  };

  // حراسة التنقل من التابات
  const handleTabSelect = async (k) => {
    if (!k || k === activeTab) return;

    // لو المستخدم رايح للتاب 2 يدوي من غير ما يعمل Next
    if (k === "step2" && !completed.step1) {
      const valid = await validateStep1();
      if (!valid) return; // امنع الانتقال
      setCompleted((c) => ({ ...c, step1: true }));
    }

    setActiveTab(k);
  };
  const tabs = [
    { key: "step1", label: formatMessage({ id: "sellerInfo" }) },
    { key: "step2", label: formatMessage({ id: "shopInfo" }) },
    { key: "step3", label: formatMessage({ id: "sellerDocuments" }) },
  ];

  return (
    <div className={`page ${styles.completeProfile}`}>
      <Container>
        <div className="page-header">
          <h4 className="page-title">
            <FormattedMessage id="completeProfile" />
          </h4>
          <p className="page-description">
            <FormattedMessage id="completeProfileDescription" />
          </p>
        </div>

        <Tab.Container activeKey={activeTab} onSelect={handleTabSelect}>
          <Row>
            {/* Tabs Nav */}
            <Nav className={`${styles.stepsNav || ""} mb-4`}>
              {tabs.map((tab, index) => {
                return (
                  <Nav.Item key={tab.key} className={styles.stepItem}>
                    <Nav.Link eventKey={tab.key}>
                      <h3 className={styles.stepIndex}>{index + 1}</h3>
                      <span className={styles.stepLabel}>{tab.label}</span>
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
            </Nav>

            {/* Form / Panes */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Tab.Content>
                {/* STEP 1 */}
                <Tab.Pane eventKey="step1">
                  <Row>
                    <Col xs={12}>
                      <UploadImg
                        handleImageChange={handleImageChange}
                        selectedImg={images.image}
                        handleRemoveImg={() => handleRemoveImg("image")}
                        register={register}
                        errors={errors}
                        name="image"
                      />
                    </Col>

                    <Col xs={12} md={6}>
                      <div className="input-wrapper">
                        <label htmlFor="name">
                          {formatMessage({ id: "name" })} :
                        </label>
                        <input
                          id="name"
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
                            <IcError /> {errors.name.message}
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6}>
                      <div className="input-wrapper">
                        <label htmlFor="email">
                          {formatMessage({ id: "email" })} :
                        </label>
                        <input
                          id="email"
                          type="email"
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
                            <IcError /> {errors.email.message}
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6}>
                      <div className="input-wrapper">
                        <label htmlFor="mobilePhone">
                          {formatMessage({ id: "mobilePhone" })} :
                        </label>
                        <input
                          id="mobilePhone"
                          type="tel"
                          dir="ltr"
                          className="special-input"
                          {...register("mobilePhone", {
                            required: formatMessage({ id: "required" }),
                            pattern: {
                              value:
                                /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
                              message: formatMessage({
                                id: "invalidMobilePhone",
                              }),
                            },
                          })}
                        />
                        {errors.mobilePhone && (
                          <p className="error">
                            <IcError /> {errors.mobilePhone.message}
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6}>
                      <div className="input-wrapper">
                        <label>
                          <FormattedMessage id="nationalId" /> :
                        </label>
                        <input
                          className="special-input"
                          dir="ltr"
                          {...register("nationalId", {
                            required: formatMessage({ id: "required" }),
                          })}
                        />
                        {errors.nationalId && (
                          <p className="error">
                            <IcError /> {errors.nationalId.message}
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6}>
                      <div className="input-wrapper">
                        <label>
                          <FormattedMessage id="address" /> :
                        </label>
                        <input
                          className="special-input"
                          {...register("address", {
                            required: formatMessage({ id: "required" }),
                          })}
                        />
                        {errors.address && (
                          <p className="error">
                            <IcError /> {errors.address.message}
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6}>
                      <div className="input-wrapper">
                        <label>
                          <FormattedMessage id="dateOfBirth" /> :
                        </label>
                        <input
                          type="date"
                          className="special-input"
                          dir="ltr"
                          placeholder={formatMessage({ id: "dateOfBirth" })}
                          {...register("dateOfBirth", {
                            required: formatMessage({ id: "required" }),
                          })}
                        />
                        {errors.dateOfBirth && (
                          <p className="error">
                            <IcError /> {errors.dateOfBirth.message}
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12}>
                      <Button
                        className="btn submit"
                        type="button"
                        onClick={handleNext}
                      >
                        <FormattedMessage id="next" />
                      </Button>
                    </Col>
                  </Row>
                </Tab.Pane>

                {/* STEP 2 */}
                <Tab.Pane eventKey="step2">
                  <Row>
                    <Col xs={12} md={6}>
                      <div className="input-wrapper">
                        <label htmlFor="storeName">
                          <FormattedMessage id="storeName" /> :
                        </label>
                        <input
                          id="storeName"
                          className="special-input"
                          {...register("storeName", {
                            required: formatMessage({ id: "required" }),
                          })}
                        />
                        {errors.storeName && (
                          <p className="error">
                            <IcError /> {errors.storeName.message}
                          </p>
                        )}
                      </div>
                    </Col>

                    {/* ---- Payment Info ---- */}

                    <Col xs={12} md={6}>
                      <div className="input-wrapper">
                        <label htmlFor="cardHolderName">
                          <FormattedMessage id="cardHolderName" /> :
                        </label>
                        <input
                          id="cardHolderName"
                          className="special-input"
                          {...register("paymentInfo.cardHolderName", {
                            required: formatMessage({ id: "required" }),
                          })}
                        />
                        {errors?.paymentInfo?.cardHolderName && (
                          <p className="error">
                            <IcError />{" "}
                            {errors.paymentInfo.cardHolderName.message}
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6}>
                      <div className="input-wrapper">
                        <label htmlFor="cardBrand">
                          <FormattedMessage id="cardBrand" /> :
                        </label>
                        <input
                          id="cardBrand"
                          className="special-input"
                          {...register("paymentInfo.cardBrand", {
                            required: formatMessage({ id: "required" }),
                          })}
                        />
                        {errors?.paymentInfo?.cardBrand && (
                          <p className="error">
                            <IcError /> {errors.paymentInfo.cardBrand.message}
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6}>
                      <div className="input-wrapper">
                        <label htmlFor="cardLast4Digits">
                          <FormattedMessage id="cardLast4Digits" /> :
                        </label>
                        <input
                          id="cardLast4Digits"
                          className="special-input"
                          maxLength={4}
                          {...register("paymentInfo.cardLast4Digits", {
                            required: formatMessage({ id: "required" }),
                            pattern: {
                              value: /^[0-9]{4}$/,
                              message: formatMessage({ id: "invalidLast4" }),
                            },
                          })}
                        />
                        {errors?.paymentInfo?.cardLast4Digits && (
                          <p className="error">
                            <IcError />{" "}
                            {errors.paymentInfo.cardLast4Digits.message}
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6}>
                      <div className="input-wrapper">
                        <label htmlFor="expiryDate">
                          <FormattedMessage id="expiryDate" /> :
                        </label>
                        <input
                          id="expiryDate"
                          type="month"
                          className="special-input"
                          {...register("paymentInfo.expiryDate", {
                            required: formatMessage({ id: "required" }),
                          })}
                        />
                        {errors?.paymentInfo?.expiryDate && (
                          <p className="error">
                            <IcError /> {errors.paymentInfo.expiryDate.message}
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col
                      xs={12}
                      className="d-flex justify-content-between mt-3"
                    >
                      <button className="btn submit" type="button">
                        <FormattedMessage id="previous" />
                      </button>
                      <button className="btn submit" type="button">
                        <FormattedMessage id="previous" />
                      </button>
                    </Col>
                  </Row>
                </Tab.Pane>

                {/* STEP 3 */}
                <Tab.Pane eventKey="step3">
                  <Row>
                    {[
                      "frontId",
                      "backId",
                      "commercialRegister",
                      "taxCard",
                      "otherDocs",
                    ].map((name) => (
                      <Col xs={12} md={6} key={name}>
                        <UploadFile2
                          handleFileChange={handleImageChange}
                          selectedFile={images[name]}
                          handleRemoveFile={() => handleRemoveImg(name)}
                          register={register}
                          errors={errors}
                          name={name}
                        />
                      </Col>
                    ))}

                    <Col
                      xs={12}
                      className="d-flex justify-content-between mt-3"
                    >
                      <button
                        type="button"
                        className="btn submit"
                        onClick={handlePrevious}
                      >
                        <FormattedMessage id="previous" />
                      </button>
                      <button
                        variant="success"
                        type="submit"
                        className="btn submit"
                      >
                        <FormattedMessage id="submit" />
                      </button>
                    </Col>
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </form>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
};

export default SellerDocumentsForm;
