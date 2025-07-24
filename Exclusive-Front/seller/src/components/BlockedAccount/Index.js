import React from "react";
import { FormattedMessage } from "react-intl";

const Index = () => {
  return (
    <div className="container mt-5 text-center d-flex flex-column align-items-center justify-content-center min-vh-100">
      <h3 className="mb-3">
        <FormattedMessage
          id="BlockedAccountTitle"
          defaultMessage="Blocked Account"
        />
      </h3>
      <p>
        <FormattedMessage
          id="BlockedAccountDescription"
          defaultMessage="Your account has been blocked. Please contact support for more information."
        />
      </p>
    </div>
  );
};

export default Index;
