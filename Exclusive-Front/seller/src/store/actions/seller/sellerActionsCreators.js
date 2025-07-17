import {
  GET_SELLER,
  GET_SELLER_FAIL,
  GET_SELLER_PROFILE,
  GET_SELLER_PROFILE_FAIL,
  GET_SELLER_PROFILE_SUCCESS,
  GET_SELLER_SUCCESS,
  GET_SELLERS,
  GET_SELLERS_FAIL,
  GET_SELLERS_SUCCESS,
  POST_SELLER_LOGIN,
  POST_SELLER_LOGIN_FAIL,
  POST_SELLER_LOGIN_SUCCESS,
  POST_SELLER_LOGOUT,
  POST_SELLER_LOGOUT_FAIL,
  POST_SELLER_LOGOUT_SUCCESS,
  POST_SELLER_OTP,
  POST_SELLER_OTP_FAIL,
  POST_SELLER_OTP_SUCCESS,
  POST_SELLER_REGISTER,
  POST_SELLER_REGISTER_FAIL,
  POST_SELLER_REGISTER_SUCCESS,
  POST_SELLER_RESEND_OTP,
  POST_SELLER_RESEND_OTP_FAIL,
  POST_SELLER_RESEND_OTP_SUCCESS,
  PUT_SELLER_PROFILE,
  PUT_SELLER_PROFILE_FAIL,
  PUT_SELLER_PROFILE_SUCCESS,
} from "./actionTypes";

export const getSeller = (payLoad) => {
  return {
    type: GET_SELLER,
    payLoad,
  };
};
export const getSellerSuccess = (payLoad) => {
  return {
    type: GET_SELLER_SUCCESS,
    payLoad,
  };
};
export const getSellerFail = (payLoad) => {
  return {
    type: GET_SELLER_FAIL,
    payLoad,
  };
};
// =================================================================
export const postSellerLogin = (payLoad) => {
  return {
    type: POST_SELLER_LOGIN,
    payLoad,
  };
};
export const postSellerLoginSuccess = (payLoad) => {
  return {
    type: POST_SELLER_LOGIN_SUCCESS,
    payLoad,
  };
};
export const postSellerLoginFail = (payLoad) => {
  return {
    type: POST_SELLER_LOGIN_FAIL,
    payLoad,
  };
};

// =================================================================
export const postSellerRegister = (payLoad) => {
  return {
    type: POST_SELLER_REGISTER,
    payLoad,
  };
};
export const postSellerRegisterSuccess = (payLoad) => {
  return {
    type: POST_SELLER_REGISTER_SUCCESS,
    payLoad,
  };
};
export const postSellerRegisterFail = (payLoad) => {
  return {
    type: POST_SELLER_REGISTER_FAIL,
    payLoad,
  };
};
// =================================================================
export const postOtp = (payLoad) => {
  return {
    type: POST_SELLER_OTP,
    payLoad,
  };
};
export const postOtpSuccess = (payLoad) => {
  return {
    type: POST_SELLER_OTP_SUCCESS,
    payLoad,
  };
};
export const postOtpFail = (payLoad) => {
  return {
    type: POST_SELLER_OTP_FAIL,
    payLoad,
  };
};
// =================================================================
export const postResendOtp = (payLoad) => {
  return {
    type: POST_SELLER_RESEND_OTP,
    payLoad,
  };
};
export const postResendOtpSuccess = (payLoad) => {
  return {
    type: POST_SELLER_RESEND_OTP_SUCCESS,
    payLoad,
  };
};
export const postResendOtpFail = (payLoad) => {
  return {
    type: POST_SELLER_RESEND_OTP_FAIL,
    payLoad,
  };
};

// =================================================================
export const postSellerLogout = (payLoad) => {
  return {
    type: POST_SELLER_LOGOUT,
    payLoad,
  };
};
export const postSellerLogoutSuccess = (payLoad) => {
  return {
    type: POST_SELLER_LOGOUT_SUCCESS,
    payLoad,
  };
};
export const postSellerLogoutFail = (payLoad) => {
  return {
    type: POST_SELLER_LOGOUT_FAIL,
    payLoad,
  };
};

// // =================================================================

export const getSellerProfile = (payLoad) => {
  return {
    type: GET_SELLER_PROFILE,
    payLoad,
  };
};
export const getSellerProfileSuccess = (payLoad) => {
  return {
    type: GET_SELLER_PROFILE_SUCCESS,
    payLoad,
  };
};
export const getSellerProfileFail = (payLoad) => {
  return {
    type: GET_SELLER_PROFILE_FAIL,
    payLoad,
  };
};
// // =================================================================

export const putSellerProfile = (payLoad) => {
  return {
    type: PUT_SELLER_PROFILE,
    payLoad,
  };
};
export const putSellerProfileSuccess = (payLoad) => {
  return {
    type: PUT_SELLER_PROFILE_SUCCESS,
    payLoad,
  };
};
export const putSellerProfileFail = (payLoad) => {
  return {
    type: PUT_SELLER_PROFILE_FAIL,
    payLoad,
  };
};
// // =================================================================

export const getSellers = () => {
  return { type: GET_SELLERS };
};
export const getSellersSuccess = (payLoad) => {
  return { type: GET_SELLERS_SUCCESS, payLoad };
};
export const getSellersFail = (payLoad) => {
  return { type: GET_SELLERS_FAIL, payLoad };
};
