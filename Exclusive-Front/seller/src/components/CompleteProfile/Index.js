import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Tab, Tabs } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
const SellerDocumentsForm = () => {
  const [key, setKey] = useState("step1");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  const goToStep = async (nextStep) => {
    const isValid = await trigger([
      "nationalId",
      "address",
      "frontId",
      "backId",
    ]);
    if (isValid) setKey(nextStep);
  };

  return (
    <div className={styles.completeProfile}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs
          activeKey={key}
          onSelect={(k) => k === "step2" && goToStep("step2")}
        >
          <Tab eventKey="step1" title="المعلومات الأساسية">
            <div className="p-3">
              <div className="mb-3">
                <label>الرقم القومي</label>
                <input
                  className="form-control"
                  {...register("nationalId", { required: "هذا الحقل مطلوب" })}
                />
                {errors.nationalId && (
                  <span className="text-danger">
                    {errors.nationalId.message}
                  </span>
                )}
              </div>

              <div className="mb-3">
                <label>العنوان</label>
                <input
                  className="form-control"
                  {...register("address", { required: "هذا الحقل مطلوب" })}
                />
                {errors.address && (
                  <span className="text-danger">{errors.address.message}</span>
                )}
              </div>

              <div className="mb-3">
                <label>صورة البطاقة (الوجه الأمامي)</label>
                <input
                  type="file"
                  className="form-control"
                  {...register("frontId", { required: "الصورة مطلوبة" })}
                />
                {errors.frontId && (
                  <span className="text-danger">{errors.frontId.message}</span>
                )}
              </div>

              <div className="mb-3">
                <label>صورة البطاقة (الوجه الخلفي)</label>
                <input
                  type="file"
                  className="form-control"
                  {...register("backId", { required: "الصورة مطلوبة" })}
                />
                {errors.backId && (
                  <span className="text-danger">{errors.backId.message}</span>
                )}
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => goToStep("step2")}
              >
                التالى
              </button>
            </div>
          </Tab>

          <Tab
            eventKey="step2"
            title="مستندات إضافية"
            disabled={key === "step1"}
          >
            <div className="p-3">
              <div className="mb-3">
                <label>السجل التجاري</label>
                <input
                  type="file"
                  className="form-control"
                  {...register("commercialRegister")}
                />
              </div>

              <div className="mb-3">
                <label>البطاقة الضريبية</label>
                <input
                  type="file"
                  className="form-control"
                  {...register("taxCard")}
                />
              </div>

              <div className="mb-3">
                <label>مستندات أخرى</label>
                <input
                  type="file"
                  className="form-control"
                  multiple
                  {...register("otherDocs")}
                />
              </div>

              <button type="submit" className="btn btn-success">
                إرسال
              </button>
            </div>
          </Tab>
        </Tabs>
      </form>
    </div>
  );
};

export default SellerDocumentsForm;
