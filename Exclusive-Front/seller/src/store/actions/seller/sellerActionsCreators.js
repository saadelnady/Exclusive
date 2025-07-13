import { SELLER_ACTIONS_TYPES, SELLERS_ACTIONS_TYPES } from "../actionTypes";

export const getSeller = (payLoad) => {
  return {
    type: SELLER_ACTIONS_TYPES.GET_SELLER,
    payLoad,
  };
};
export const getSellerSuccess = (payLoad) => {
  return {
    type: SELLER_ACTIONS_TYPES.GET_SELLER_SUCCESS,
    payLoad,
  };
};
export const getSellerFail = (payLoad) => {
  return {
    type: SELLER_ACTIONS_TYPES.GET_SELLER_FAIL,
    payLoad,
  };
};
// =================================================================
export const postSellerLogin = (payLoad) => {
  return {
    type: SELLER_ACTIONS_TYPES.POST_SELLER_LOGIN,
    payLoad,
  };
};
export const postSellerLoginSuccess = (payLoad) => {
  return {
    type: SELLER_ACTIONS_TYPES.POST_SELLER_LOGIN_SUCCESS,
    payLoad,
  };
};
export const postSellerLoginFail = (payLoad) => {
  return {
    type: SELLER_ACTIONS_TYPES.POST_SELLER_LOGIN_FAIL,
    payLoad,
  };
};

// =================================================================
export const postSellerRegister = (payLoad) => {
  return {
    type: SELLER_ACTIONS_TYPES.POST_SELLER_REGISTER,
    payLoad,
  };
};
export const postSellerRegisterSuccess = (payLoad) => {
  return {
    type: SELLER_ACTIONS_TYPES.POST_SELLER_REGISTER_SUCCESS,
    payLoad,
  };
};
export const postSellerRegisterFail = (payLoad) => {
  return {
    type: SELLER_ACTIONS_TYPES.POST_SELLER_REGISTER_FAIL,
    payLoad,
  };
};

// =================================================================
export const postSellerLogout = (payLoad) => {
  return {
    type: SELLER_ACTIONS_TYPES.POST_SELLER_LOGOUT,
    payLoad,
  };
};
export const postSellerLogoutSuccess = (payLoad) => {
  return {
    type: SELLER_ACTIONS_TYPES.POST_SELLER_LOGOUT_SUCCESS,
    payLoad,
  };
};
export const postSellerLogoutFail = (payLoad) => {
  return {
    type: SELLER_ACTIONS_TYPES.POST_SELLER_LOGOUT_FAIL,
    payLoad,
  };
};

// // =================================================================

export const getSellerProfile = (payLoad) => {
  return {
    type: SELLER_ACTIONS_TYPES.GET_SELLER_PROFILE,
    payLoad,
  };
};
export const getSellerProfileSuccess = (payLoad) => {
  return {
    type: SELLER_ACTIONS_TYPES.GET_SELLER_PROFILE_SUCCESS,
    payLoad,
  };
};
export const getSellerProfileFail = (payLoad) => {
  return {
    type: SELLER_ACTIONS_TYPES.GET_SELLER_PROFILE_FAIL,
    payLoad,
  };
};
// // =================================================================

export const putSellerProfile = (payLoad) => {
  return {
    type: SELLER_ACTIONS_TYPES.PUT_SELLER_PROFILE,
    payLoad,
  };
};
export const putSellerProfileSuccess = (payLoad) => {
  return {
    type: SELLER_ACTIONS_TYPES.PUT_SELLER_PROFILE_SUCCESS,
    payLoad,
  };
};
export const putSellerProfileFail = (payLoad) => {
  return {
    type: SELLER_ACTIONS_TYPES.PUT_SELLER_PROFILE_FAIL,
    payLoad,
  };
};
// // =================================================================

export const getSellers = () => {
  return { type: SELLERS_ACTIONS_TYPES.GET_SELLERS };
};
export const getSellersSuccess = (payLoad) => {
  return { type: SELLERS_ACTIONS_TYPES.GET_SELLERS_SUCCESS, payLoad };
};
export const getSellersFail = (payLoad) => {
  return { type: SELLERS_ACTIONS_TYPES.GET_SELLERS_FAIL, payLoad };
};
