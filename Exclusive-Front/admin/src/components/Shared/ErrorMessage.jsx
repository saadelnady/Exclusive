import React from "react";
import { MdError } from "react-icons/md";

const ErrorMessage = ({ touched, errors, fieldName, condition = true }) => {
  return touched[fieldName] && errors[fieldName] && condition ? (
    <p className="text-sm-end">
      <MdError className="fs-3 me-2" />
      {errors[fieldName]}
    </p>
  ) : null;
};

export default ErrorMessage;
