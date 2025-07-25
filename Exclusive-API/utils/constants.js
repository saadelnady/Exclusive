const roles = Object.freeze({
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
  USER: "USER",
  SELLER: "SELLER",
});

const httpStatusText = Object.freeze({
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
  ERROR: "ERROR",
});

const productStatus = Object.freeze({
  ACCEPTED: "ACCEPTED",
  BLOCKED: "BLOCKED",
  PENDING: "PENDING",
});
const userStatus = Object.freeze({
  VERIFIED: "VERIFIED",
  NOTVERIFIED: "NOTVERIFIED",
  BLOCKED: "BLOCKED",
});
const sellerStatus = Object.freeze({
  NOTVERIFIED: "NOTVERIFIED",
  PENDING_APPROVAL: "PENDING_APPROVAL",
  VERIFIED: "VERIFIED",
  BLOCKED: "BLOCKED",
});

module.exports = {
  httpStatusText,
  productStatus,
  roles,
  userStatus,
  sellerStatus,
};
