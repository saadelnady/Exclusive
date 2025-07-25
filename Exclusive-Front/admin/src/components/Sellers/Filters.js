import { sellerStatus } from "@/helpers/roles";
import React, { useCallback, useState } from "react";
import { Offcanvas, Button, Form } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
import styles from "./styles/styles.module.scss";
const Filters = ({ show, handleClose, selectedStatuses, onChange }) => {
  const { locale } = useIntl();
  const handleCheckboxChange = useCallback(
    (status) => {
      const updated = selectedStatuses.includes(status)
        ? selectedStatuses.filter((s) => s !== status)
        : [...selectedStatuses, status];
      onChange(updated);
    },
    [selectedStatuses, onChange]
  );

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement={locale === "ar" ? "start" : "end"}
      className={styles.filtersOffcanvas}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          {" "}
          <FormattedMessage id="sellersFilter" />{" "}
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="filterTitle">
          <p className="title">
            <FormattedMessage id="filterByAcountStatus" />
          </p>
          <button
            className="btn p-0"
            type="button"
            onClick={() => onChange([])}
          >
            <FormattedMessage id="clearFilters" />
          </button>
        </div>
        <Form>
          {Object.entries(sellerStatus).map(([key, value]) => (
            <Form.Check
              key={key}
              type="checkbox"
              id={`status-${value}`}
              label={<FormattedMessage id={value} />}
              checked={selectedStatuses.includes(value)}
              onChange={() => handleCheckboxChange(value)}
            />
          ))}
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Filters;
