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

const CompleteProfile = () => {
  const { seller } = useSelector((state) => state.sellerReducer);
  const { locale, formatMessage } = useIntl();
  const [activeTab, setActiveTab] = useState("step1");
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const dispatch = useDispatch();
  const tabs = [
    { key: "step1", label: formatMessage({ id: "sellerInfo" }) },
    { key: "step2", label: formatMessage({ id: "shopInfo" }) },
    { key: "step3", label: formatMessage({ id: "sellerDocuments" }) },
  ];

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
  const validateStep = async (key) => {
    switch (key) {
      case "step1":
        return await trigger([
          "name",
          "email",
          "mobilePhone",
          "address",
          "nationalId",
          "dateOfBirth",
        ]);
      case "step2":
        return await trigger([
          "storeName",
          "cardHolderName",
          "cardLast4Digits",
          "cardBrand",
          "expiryDate",
          "paymentInfo.method",
          "paymentInfo.card.cardHolderName",
          "paymentInfo.card.cardLast4Digits",
          "paymentInfo.card.cardBrand",
          "paymentInfo.card.expiryDate",
          "paymentInfo.instapay.phone",
          "paymentInfo.vodafoneCash.phone",
        ]);
      case "step3":
        return await trigger([
          "frontId",
          "backId",
          "commercialRegister",
          "taxCard",
          "otherDocs",
        ]);
      default:
        return true;
    }
  };
  const handleTabSelect = async (key) => {
    if (key === activeTab) return;

    const targetIndex = tabs.findIndex((tab) => tab.key === key);

    for (let i = 0; i < targetIndex; i++) {
      if (!completed[tabs[i].key]) {
        const isValid = await validateStep(tabs[i].key);
        if (!isValid) return;
        setCompleted((prev) => ({ ...prev, [tabs[i].key]: true }));
      }
    }

    setCurrentTabIndex(targetIndex);
    setActiveTab(key);
  };
  const handleNext = async () => {
    const currentKey = tabs[currentTabIndex].key;
    const isValid = await validateStep(currentKey);
    if (!isValid) return;

    setCompleted((prev) => ({ ...prev, [currentKey]: true }));

    if (currentTabIndex < tabs.length - 1) {
      const nextIndex = currentTabIndex + 1;
      setCurrentTabIndex(nextIndex);
      setActiveTab(tabs[nextIndex].key);
    }
  };

  const handlePrevious = () => {
    if (currentTabIndex > 0) {
      const prevIndex = currentTabIndex - 1;
      setCurrentTabIndex(prevIndex);
      setActiveTab(tabs[prevIndex].key);
    }
  };

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
            <Nav>
              {tabs.map((tab, index) => {
                return (
                  <Nav.Item key={tab.key}>
                    <Nav.Link eventKey={tab.key}>
                      <h3>{index + 1}</h3>
                      <span>{tab.label}</span>
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
                  </Row>
                </Tab.Pane>
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

                    {/* Payment Method Selector */}
                    <Col xs={12} md={6}>
                      <div className="input-wrapper">
                        <label htmlFor="paymentMethod">
                          <FormattedMessage
                            id="paymentMethod"
                            defaultMessage="Payment Method"
                          />
                          :
                        </label>
                        <select
                          id="method"
                          className="special-input"
                          {...register("paymentInfo.method", {
                            required: formatMessage({ id: "required" }),
                          })}
                        >
                          <option value="">--</option>
                          <option value="card">
                            {formatMessage({ id: "card" })}
                          </option>
                          <option value="instapay">
                            {formatMessage({ id: "instapay" })}
                          </option>
                          <option value="vodafoneCash">
                            {formatMessage({ id: "vodafoneCash" })}
                          </option>
                        </select>
                        {errors?.paymentInfo?.method && (
                          <p className="error">
                            <IcError /> {errors.paymentInfo.method.message}
                          </p>
                        )}
                      </div>
                    </Col>

                    {/* ====== Card Fields ====== */}
                    {watch("paymentInfo.method") === "card" && (
                      <>
                        <Col xs={12} md={6}>
                          <div className="input-wrapper">
                            <label htmlFor="cardHolderName">
                              <FormattedMessage id="cardHolderName" /> :
                            </label>
                            <input
                              id="cardHolderName"
                              className="special-input"
                              {...register("paymentInfo.card.cardHolderName", {
                                required: formatMessage({ id: "required" }),
                              })}
                            />
                            {errors?.paymentInfo?.card?.cardHolderName && (
                              <p className="error">
                                <IcError />{" "}
                                {errors.paymentInfo.card.cardHolderName.message}
                              </p>
                            )}
                          </div>
                        </Col>

                        <Col xs={12} md={6}>
                          <div className="input-wrapper">
                            <label htmlFor="cardBrand">
                              <FormattedMessage id="cardBrand" /> :
                            </label>
                            <select
                              id="cardBrand"
                              className="special-input"
                              {...register("paymentInfo.card.cardBrand", {
                                required: formatMessage({ id: "required" }),
                              })}
                            >
                              <option value="">--</option>
                              <option value="Visa">
                                {formatMessage({ id: "visa" })}
                              </option>
                              <option value="MasterCard">
                                {formatMessage({ id: "masterCard" })}
                              </option>
                              <option value="Discover">
                                {formatMessage({ id: "discover" })}
                              </option>
                            </select>
                            {errors?.paymentInfo?.card?.cardBrand && (
                              <p className="error">
                                <IcError />{" "}
                                {errors.paymentInfo.card.cardBrand.message}
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
                              {...register("paymentInfo.card.cardLast4Digits", {
                                required: formatMessage({ id: "required" }),
                                pattern: {
                                  value: /^[0-9]{4}$/,
                                  message: formatMessage({
                                    id: "invalidLast4Digits",
                                  }),
                                },
                              })}
                            />
                            {errors?.paymentInfo?.card?.cardLast4Digits && (
                              <p className="error">
                                <IcError />
                                {
                                  errors.paymentInfo.card.cardLast4Digits
                                    .message
                                }
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
                              {...register("paymentInfo.card.expiryDate", {
                                required: formatMessage({ id: "required" }),
                              })}
                            />
                            {errors?.paymentInfo?.card?.expiryDate && (
                              <p className="error">
                                <IcError />{" "}
                                {errors.paymentInfo.card.expiryDate.message}
                              </p>
                            )}
                          </div>
                        </Col>
                      </>
                    )}

                    {/* ====== Instapay ====== */}
                    {watch("paymentInfo.method") === "instapay" && (
                      <Col xs={12} md={6}>
                        <div className="input-wrapper">
                          <label htmlFor="instapayEmail">
                            <FormattedMessage id="instapayNumber" /> :
                          </label>
                          <input
                            id="instapayNumber"
                            className="special-input"
                            {...register("paymentInfo.instapay.phone", {
                              required: formatMessage({ id: "required" }),
                            })}
                          />
                          {errors?.paymentInfo?.instapay?.phone && (
                            <p className="error">
                              <IcError />{" "}
                              {errors.paymentInfo.instapay.phone.message}
                            </p>
                          )}
                        </div>
                      </Col>
                    )}

                    {/* ====== Vodafone Cash ====== */}
                    {watch("paymentInfo.method") === "vodafoneCash" && (
                      <Col xs={12} md={6}>
                        <div className="input-wrapper">
                          <label htmlFor="vodafoneCashPhone">
                            <FormattedMessage id="vodafoneCashNumber" />:
                          </label>
                          <input
                            id="vodafoneCashPhone"
                            className="special-input"
                            {...register("paymentInfo.vodafoneCash.phone", {
                              required: formatMessage({ id: "required" }),
                              pattern: {
                                value: /^01[0-2,5]{1}[0-9]{8}$/,
                                message: formatMessage({ id: "invalidPhone" }),
                              },
                            })}
                          />
                          {errors?.paymentInfo?.vodafoneCash?.phone && (
                            <p className="error">
                              <IcError />{" "}
                              {errors.paymentInfo.vodafoneCash.phone.message}
                            </p>
                          )}
                        </div>
                      </Col>
                    )}
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
                  </Row>
                </Tab.Pane>

                <div className="d-flex justify-content-between mt-3">
                  {currentTabIndex > 0 && (
                    <button
                      onClick={handlePrevious}
                      disabled={currentTabIndex === 0}
                      className="btn submit"
                      type="button"
                    >
                      <FormattedMessage id="previous" />
                    </button>
                  )}
                  {currentTabIndex === tabs.length - 1 && (
                    <button type="submit" className="btn submit">
                      <FormattedMessage id="submit" />
                    </button>
                  )}

                  {currentTabIndex !== tabs.length - 1 && (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn submit"
                    >
                      <FormattedMessage id="next" />
                    </button>
                  )}
                </div>
              </Tab.Content>
            </form>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
};

export default CompleteProfile;
