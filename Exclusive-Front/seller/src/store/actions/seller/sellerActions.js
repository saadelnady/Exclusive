import { getData, postData, putData } from "../../../API/API";
import { showToast } from "../../../helpers/toast_helper";
import * as actionCreators from "./sellerActionsCreators";

export const fetchSeller = ({ sellerId }) => {
  return async (dispatch) => {
    dispatch(actionCreators.getSeller(sellerId));
    try {
      const response = await getData(`/api/sellers/${sellerId}`);
      dispatch(actionCreators.getSellerSuccess(response?.data?.seller));
    } catch (error) {
      dispatch(actionCreators.getSellerFail(error));
    }
  };
};
// ========================================================================================

export const fetchSellerProfile = () => {
  return async (dispatch) => {
    dispatch(actionCreators.getSellerProfile());
    try {
      const response = await getData(`/api/sellers/getProfile`);
      dispatch(actionCreators.getSellerProfileSuccess(response?.data?.seller));
    } catch (error) {
      dispatch(actionCreators.getSellerProfileFail(error));
    }
  };
};
// ========================================================================================
export const editSellerProfile = ({ sellerId, values, toast, locale }) => {
  return async (dispatch) => {
    dispatch(actionCreators.putSellerProfile());
    try {
      const response = await putData(`/api/sellers/${sellerId}`, values);
      dispatch(actionCreators.putSellerProfileSuccess(response));
      showToast(toast, response?.message?.[locale], "success");
    } catch (error) {
      dispatch(actionCreators.putSellerProfileFail(error));
      showToast(toast, error?.response?.data?.message?.[locale], "error");
    }
  };
};
// ========================================================================================

export const sellerLogin = ({ values, toast, navigate, locale }) => {
  return async (dispatch) => {
    dispatch(actionCreators.postSellerLogin(values));
    try {
      const response = await postData(`/api/sellers/login`, values);

      dispatch(actionCreators.postSellerLoginSuccess(response?.data));
      localStorage.setItem("TOKEN", response?.data?.token);
      showToast(toast, response?.message?.[locale], "success");
      setTimeout(() => {
        if (localStorage.getItem("TOKEN")) {
          navigate("/");
        }
      }, 2500);
    } catch (error) {
      dispatch(actionCreators.postSellerLoginFail(error));
      showToast(toast, error?.response?.data?.message?.[locale], "error");
    }
  };
};
// ========================================================================================

export const sellerLogout = ({ toast, navigate }) => {
  return async (dispatch) => {
    dispatch(actionCreators.postSellerLogout());

    try {
      dispatch(actionCreators.postSellerLogoutSuccess());
      localStorage.removeItem("TOKEN");
      showToast(toast, "You have logged out successfully", "success");

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (error) {
      dispatch(actionCreators.postSellerLogoutFail());
      showToast(toast, "Something wrong when logout", "error");
    }
  };
};
// ========================================================================================
export const sellerRegister = ({ values, toast, navigate, locale }) => {
  return async (dispatch) => {
    dispatch(actionCreators.postSellerRegister(values));

    try {
      const response = await postData("/api/sellers/register", values);
      dispatch(actionCreators.postSellerRegisterSuccess(response));
      navigate("/otp");
      showToast(toast, response?.message?.[locale], "success");
      localStorage.setItem("targetEmail", values.email);
    } catch (error) {
      dispatch(actionCreators.postSellerRegisterFail(error));
      showToast(toast, error?.response?.data?.message?.[locale], "error");
    }
  };
};
// ========================================================================================
export const sellrOtp = ({ values, toast, navigate, locale }) => {
  return async (dispatch) => {
    dispatch(actionCreators.postOtp(values));

    try {
      const response = await postData("/api/sellers/otp", values);
      dispatch(actionCreators.postOtpSuccess(response));
      navigate("/login");
      showToast(toast, response?.message?.[locale], "success");
      localStorage.removeItem("targetEmail");
    } catch (error) {
      dispatch(actionCreators.postOtpFail(error));
      showToast(toast, error?.response?.data?.message?.[locale], "error");
    }
  };
};
// ========================================================================================
export const sellrResendOtp = ({ values, toast, locale }) => {
  return async (dispatch) => {
    dispatch(actionCreators.postResendOtp(values));

    try {
      const response = await postData(
        "/api/sellers/resendVerification",
        values
      );
      dispatch(actionCreators.postResendOtpSuccess(response));

      showToast(toast, response?.message?.[locale], "success");
    } catch (error) {
      dispatch(actionCreators.postResendOtpFail(error));
      showToast(toast, error?.response?.data?.message?.[locale], "error");
    }
  };
};

// =========================================================================================
export const fetchSellers = ({ limit = "", page = "", text = "" }) => {
  return async (dispatch) => {
    dispatch(actionCreators.getSellers());
    try {
      let response;
      if (text) {
        response = await getData(
          `/api/sellers?limit=${limit}&page=${page}&text=${text}`
        );
      } else {
        response = await getData(`/api/sellers?limit=${limit}&page=${page}`);
      }
      dispatch(actionCreators.getSellersSuccess(response?.data));
    } catch (error) {
      dispatch(actionCreators.getSellersFail(error));
    }
  };
};
