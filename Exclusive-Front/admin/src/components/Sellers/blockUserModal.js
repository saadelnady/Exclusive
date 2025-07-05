import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import styles from "./styles/styles.module.scss";

import IcClose from "./assets/images/svgs/ic-close.svg";

const BlockUserModal = ({ show, handleClose, onSubmit }) => {
  const { formatMessage } = useIntl();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className={styles["delete-modal"]}
      >
        <Modal.Header>
          <Modal.Title>
            <FormattedMessage id="blockUser" />
          </Modal.Title>
          <button onClick={handleClose}>
            <IcClose />
          </button>
        </Modal.Header>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Form.Group controlId="blockReason">
              <Form.Label>
                <FormattedMessage id="blockReason" />
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder={formatMessage({ id: "blockReason" })}
                {...register("blockReason", {
                  required: formatMessage({ id: "required" }),
                  minLength: {
                    value: 5,
                    message: formatMessage({ id: "minLength" }),
                  },
                })}
                isInvalid={!!errors.blockReason}
              />
              <Form.Control.Feedback type="invalid">
                {errors.blockReason?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              <FormattedMessage id="cancel" />
            </Button>
            <Button type="submit" variant="danger">
              <FormattedMessage id="block" />
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default BlockUserModal;
