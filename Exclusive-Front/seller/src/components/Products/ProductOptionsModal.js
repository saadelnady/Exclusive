import { Modal, Button, Table, Form, Row, Col } from "react-bootstrap";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";

import IcClose from "./assets/images/svgs/ic-close.svg";

import styles from "./styles/modal.module.scss";
import { attributeConfig } from "./attributeConfig";
import { FormattedMessage } from "react-intl";
const OptionModal = ({
  show,
  handleShow,
  append,
  selectedOption,
  update,
  index,
}) => {
  const { register, handleSubmit, reset, control, setValue, watch } = useForm({
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
    handleShow(); // Close modal
  };

  return (
    <Modal
      size="xl"
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
          {/* <h6 className="mb-2">الصور</h6>
          <Form.Control
            type="text"
            {...register("images.0")}
            placeholder="رابط الصورة الأولى"
            className="mb-3"
          /> */}

          <div className="my-4 d-flex justify-content-between">
            <h6>الخصائص</h6>
            <button
              type="button"
              className="btn btn-secondary"
              variant="secondary"
              onClick={() =>
                appendAttribute({ title: { ar: "", en: "" }, value: "" })
              }
            >
              + إضافة خاصية
            </button>
          </div>
          <Row>
            {fields.map((field, i) => {
              const type = watch(`attributes.${i}.type`);
              const config = attributeConfig[type]?.fields || [];

              return (
                <Col key={field.id} xs={12} md={6}>
                  <div className="border p-2 rounded mb-3">
                    <div className="option-wrapper">
                      <label>نوع الخاصية</label>
                      <select
                        className="special-input special-select "
                        {...register(`attributes.${i}.type`)}
                      >
                        <option value="">
                          <FormattedMessage id="selectOption" />
                        </option>
                        {Object.keys(attributeConfig).map((key) => (
                          <option key={key} value={key}>
                            <FormattedMessage id={key} />
                          </option>
                        ))}
                      </select>
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
                      {config.map((input, idx) => (
                        <Col xs={12} md={6} key={idx}>
                          <div className="input-wrapper">
                            <label>{input.label}</label>
                            <input
                              className="special-input"
                              type={input.type}
                              step={input.step}
                              {...register(`attributes.${i}.${input.name}`)}
                            />
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </Col>
              );
            })}
          </Row>

          <div className="input-wrapper mb-3">
            <label>عدد القطع في المخزن</label>
            <input
              className="special-input"
              type="number"
              {...register("stockCount")}
              min={0}
            />
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
