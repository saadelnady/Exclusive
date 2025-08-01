import { Modal, Button, Table, Form, Row, Col } from "react-bootstrap";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";

import IcClose from "./assets/images/svgs/ic-close.svg";
import IcError from "./assets/images/svgs/ic-error.svg";

import styles from "./styles/modal.module.scss";
import { attributeConfig } from "./attributeConfig";
import { FormattedMessage, useIntl } from "react-intl";
const OptionModal = ({
  show,
  handleShow,
  append,
  selectedOption,
  update,
  index,
}) => {
  const { formatMessage, locale } = useIntl();
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      images: [],
      attributes: [{ title: { ar: "", en: "" }, value: "" }],
      stockCount: 0,
      price: {
        priceBeforeDiscount: 0,
        discountPercentage: 0,
        discountValue: 0,
        finalPrice: 0,
      },
    },
  });
  console.log("errors", errors);

  const {
    fields,
    append: appendAttribute,
    remove,
  } = useFieldArray({
    control,
    name: "attributes",
  });

  useEffect(() => {
    if (selectedOption) {
      reset(selectedOption);
    } else {
      reset();
    }
  }, [selectedOption, reset]);

  const onSubmit = (data) => {
    if (selectedOption) {
      update(index, data);
    } else {
      append(data);
    }
    handleShow();
  };
  const allAttributeKeys = Object.keys(attributeConfig);
  const selectedTypes = watch("attributes")?.map((attr) => attr.type) || [];
  const selectedValidTypes = selectedTypes.filter((t) => t);
  const allSelected = selectedValidTypes.length >= allAttributeKeys.length;

  return (
    <Modal
      dialogClassName={styles.modalFull}
      show={show}
      onHide={handleShow}
      centered
      className={styles.modal}
    >
      <Modal.Header>
        <Modal.Title>
          {selectedOption ? "تعديل خيار" : "إضافة خيار"}
        </Modal.Title>
        <button
          onClick={() => {
            handleShow();
          }}
        >
          <IcClose />
        </button>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <div className="my-4 d-flex justify-content-between">
            <h6>الخصائص</h6>

            {!allSelected && fields.length < 4 && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() =>
                  appendAttribute({ title: { ar: "", en: "" }, value: "" })
                }
              >
                + إضافة خاصية
              </button>
            )}
          </div>
          <Row>
            {fields.map((field, i) => {
              const type = watch(`attributes.${i}.type`);
              const config = attributeConfig[type]?.fields || [];

              const selectedTypes =
                watch("attributes")?.map((item) => item.type) || [];

              return (
                <Col key={field.id} xs={12} md={6}>
                  <div className="border p-2 rounded mb-3">
                    <div className="option-wrapper">
                      <label>نوع الخاصية</label>
                      <select
                        className="special-input special-select"
                        {...register(`attributes.${i}.type`, {
                          required: formatMessage({ id: "required" }),
                        })}
                      >
                        <option value="">
                          <FormattedMessage id="selectOption" />
                        </option>

                        {Object.keys(attributeConfig).map((key) => {
                          const isSelectedInAnotherField = selectedTypes.some(
                            (t, index) => t === key && index !== i
                          );

                          return (
                            <option
                              key={key}
                              value={key}
                              disabled={isSelectedInAnotherField}
                            >
                              <FormattedMessage id={key} />
                            </option>
                          );
                        })}
                      </select>
                      {errors?.attributes?.[i]?.type && (
                        <p className="error">
                          <IcError />
                          {errors?.attributes?.[i]?.type?.message}
                        </p>
                      )}

                      {fields.length > 1 && (
                        <button
                          type="button"
                          className="btn close"
                          onClick={() => remove(i)}
                        >
                          <IcClose />
                        </button>
                      )}
                    </div>

                    <Row>
                      {config.map((input, idx) => {
                        const nameParts = input.name.split(".");
                        const fieldError = nameParts.reduce(
                          (acc, key) => acc?.[key],
                          errors?.attributes?.[i]
                        );

                        return (
                          <Col xs={12} md={6} key={idx}>
                            <div className="input-wrapper">
                              <label>{input.label}</label>
                              <input
                                className="special-input"
                                type={input.type}
                                step={input.step}
                                {...register(`attributes.${i}.${input.name}`, {
                                  required: formatMessage({ id: "required" }),
                                })}
                              />

                              {fieldError?.message && (
                                <p className="error">
                                  <IcError />
                                  {fieldError.message}
                                </p>
                              )}
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                  </div>
                </Col>
              );
            })}
          </Row>
          <div className="input-wrapper mb-3">
            <label htmlFor="stockCount">عدد القطع في المخزن</label>
            <input
              id="stockCount"
              className="special-input"
              type="number"
              min="0"
              {...register("stockCount", {
                required: formatMessage({ id: "required" }),
                min: {
                  value: 1,
                  message:
                    formatMessage({ id: "minStockIsZero" }) ||
                    "يجب أن يكون العدد 1 أو أكثر",
                },
              })}
            />

            {errors?.stockCount && (
              <p className="error">
                <IcError />
                {errors.stockCount.message}
              </p>
            )}
          </div>

          <h6>السعر</h6>
          <Table className="table" bordered size="sm" responsive>
            <thead>
              <tr>
                <th>السعر قبل الخصم</th>
                <th>نسبة الخصم (%)</th>
                <th>قيمة الخصم</th>
                <th>السعر النهائي</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="input-wrapper">
                    <input
                      className="special-input"
                      type="number"
                      {...register("price.priceBeforeDiscount")}
                      min={0}
                    />
                  </div>
                </td>
                <td>
                  <div className="input-wrapper">
                    <input
                      className="special-input"
                      type="number"
                      {...register("price.discountPercentage")}
                      min={0}
                      max={100}
                    />
                  </div>
                </td>
                <td>
                  <div className="input-wrapper">
                    <input
                      className="special-input"
                      type="number"
                      {...register("price.discountValue")}
                      min={0}
                    />
                  </div>
                </td>
                <td>
                  <div className="input-wrapper">
                    <input
                      className="special-input"
                      type="number"
                      {...register("price.finalPrice")}
                      min={0}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            إلغاء
          </Button>
          <Button type="submit" variant="primary">
            {selectedOption ? "تحديث" : "إضافة"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default OptionModal;
