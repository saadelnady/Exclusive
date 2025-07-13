import { showToast } from "../../../helpers/toast_helper";
import * as actionsCreators from "./couponCodeActionsCreators";
import { getData, postData } from "../../../API/API.js";

export const addCoupon = ({ values, toast }) => {
  return async (dispatch) => {
    dispatch(actionsCreators.addCoupon(values));
    try {
      const response = await postData(`/api/couponCode`, values);
      dispatch(actionsCreators.addCouponSuccess(response));
      showToast(toast, response?.message, "success");
    } catch (error) {
      dispatch(actionsCreators.addCouponFail(error?.response?.data?.message));
      showToast(toast, error?.response?.data?.message, "error");
    }
  };
};
export const fetchSellerCoupons = ({ sellerId }) => {
  return async (dispatch) => {
    dispatch(actionsCreators.getSellerCoupons());
    try {
      const response = await getData(
        `/api/couponCode/getSellerCoupons/${sellerId}`
      );
      dispatch(actionsCreators.getSellerCouponsSuccess(response));
    } catch (error) {
      dispatch(
        actionsCreators.getSellerCouponsFail(error?.response?.data?.message)
      );
    }
  };
};
