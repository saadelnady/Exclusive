import {
  COUPONS_ACTIONS_TYPES,
  COUPON_CODE_ACTIONS_TYPES,
} from "../actionTypes";

export const addCoupon = (payLoad) => {
  return {
    type: COUPON_CODE_ACTIONS_TYPES.POST_COUPON_CODE,
    payLoad,
  };
};
export const addCouponSuccess = (payLoad) => {
  return {
    type: COUPON_CODE_ACTIONS_TYPES.POST_COUPON_CODE_SUCCESS,
    payLoad,
  };
};
export const addCouponFail = (payLoad) => {
  return {
    type: COUPON_CODE_ACTIONS_TYPES.POST_COUPON_CODE_FAIL,
    payLoad,
  };
};

// ======================================================
export const getSellerCoupons = (payLoad) => {
  return {
    type: COUPONS_ACTIONS_TYPES.GET_SELLER_COUPONS,
    payLoad,
  };
};
export const getSellerCouponsSuccess = (payLoad) => {
  return {
    type: COUPONS_ACTIONS_TYPES.GET_SELLER_COUPONS_SUCCESS,
    payLoad,
  };
};
export const getSellerCouponsFail = (payLoad) => {
  return {
    type: COUPONS_ACTIONS_TYPES.GET_SELLER_COUPONS_FAIL,
    payLoad,
  };
};
