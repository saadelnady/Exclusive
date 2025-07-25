const roles = {
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
  USER: "USER",
  SELLER: "SELLER",
};

const httpStatusText = {
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
  ERROR: "ERROR",
};

const productStatus = {
  ACCEPTED: "ACCEPTED",
  BLOCKED: "BLOCKED",
  PENDING: "PENDING",
};

const userStatus = {
  VERIFIED: "VERIFIED",
  NOTVERIFIED: "NOTVERIFIED",
  BLOCKED: "BLOCKED",
};
const sellerStatus = {
  NOTVERIFIED: "NOTVERIFIED",
  PENDING_APPROVAL: "PENDING_APPROVAL",
  VERIFIED: "VERIFIED",
  BLOCKED: "BLOCKED",
};

module.exports = {
  httpStatusText,
  productStatus,
  roles,
  userStatus,
  sellerStatus,
};
