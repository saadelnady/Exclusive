import { FormattedMessage } from "react-intl";

const PendingApproval = () => {
  return (
    <div className="container mt-5 text-center d-flex flex-column align-items-center justify-content-center min-vh-100">
      <h2 className="mb-3">
        <FormattedMessage
          id="PendingApprovalTitle"
          defaultMessage="Pending Approval"
        />
      </h2>
      <p>
        <FormattedMessage
          id="PendingApprovalDescription"
          defaultMessage="Your account is being reviewed. Please wait for approval."
        />
      </p>
    </div>
  );
};

export default PendingApproval;
