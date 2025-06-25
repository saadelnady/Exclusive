import {
  PUT_ADMIN_PROFILE,
  PUT_ADMIN_PROFILE_SUCCESS,
  PUT_ADMIN_PROFILE_FAIL,
  GET_ADMIN,
  GET_ADMIN_FAIL,
  GET_ADMIN_PROFILE,
  GET_ADMIN_PROFILE_FAIL,
  GET_ADMIN_PROFILE_SUCCESS,
  GET_ADMIN_SUCCESS,
  GET_ADMINS,
  GET_ADMINS_FAIL,
  GET_ADMINS_SUCCESS,
  POST_ADMIN_LOGIN,
  POST_ADMIN_LOGIN_FAIL,
  POST_ADMIN_LOGIN_SUCCESS,
  POST_ADMIN_LOGOUT,
  POST_ADMIN_LOGOUT_FAIL,
  POST_ADMIN_LOGOUT_SUCCESS,
  POST_ADMIN_REGISTER,
  POST_ADMIN_REGISTER_FAIL,
  POST_ADMIN_REGISTER_SUCCESS,
  POST_ADD_ADMIN,
  POST_ADD_ADMIN_SUCCESS,
  POST_ADD_ADMIN_FAIL,
  DELETE_ADMIN,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_FAIL,
  GET_SELECTED_ADMIN_By_SUPER_ADMIN,
  GET_SELECTED_ADMIN_By_SUPER_ADMIN_SUCCESS,
  GET_SELECTED_ADMIN_By_SUPER_ADMIN_FAIL,
  PUT_ADMIN,
  PUT_ADMIN_SUCCESS,
  PUT_ADMIN_FAIL,
} from "./actionTypes";

// ===========================================================================
// USER
// ===========================================================================

export const getAdmin = (payLoad) => {
  return {
    type: GET_ADMIN,
    payLoad,
  };
};
export const getAdminSuccess = (payLoad) => {
  return {
    type: GET_ADMIN_SUCCESS,
    payLoad,
  };
};
export const getAdminFail = (payLoad) => {
  return {
    type: GET_ADMIN_FAIL,
    payLoad,
  };
};
// ===========================================================================
// ===========================================================================

export const postAddAdmin = (payLoad) => {
  return {
    type: POST_ADD_ADMIN,
    payLoad,
  };
};
export const postAddAdminSuccess = (payLoad) => {
  return {
    type: POST_ADD_ADMIN_SUCCESS,
    payLoad,
  };
};
export const postAddAdminFail = (payLoad) => {
  return {
    type: POST_ADD_ADMIN_FAIL,
    payLoad,
  };
};
// ===========================================================================

export const getAdminProfile = (payLoad) => {
  return {
    type: GET_ADMIN_PROFILE,
    payLoad,
  };
};
export const getAdminProfileSuccess = (payLoad) => {
  return {
    type: GET_ADMIN_PROFILE_SUCCESS,
    payLoad,
  };
};
export const getAdminProfileFail = (payLoad) => {
  return {
    type: GET_ADMIN_PROFILE_FAIL,
    payLoad,
  };
};

// ===========================================================================
export const postAdminLogin = (payLoad) => {
  return {
    type: POST_ADMIN_LOGIN,
    payLoad,
  };
};
export const postAdminLoginSuccess = (payLoad) => {
  return {
    type: POST_ADMIN_LOGIN_SUCCESS,
    payLoad,
  };
};
export const postAdminLoginFail = (payLoad) => {
  return {
    type: POST_ADMIN_LOGIN_FAIL,
    payLoad,
  };
};
// ===========================================================================

export const postAdminLogout = (payLoad) => {
  return {
    type: POST_ADMIN_LOGOUT,
    payLoad,
  };
};
export const postAdminLogoutSuccess = (payLoad) => {
  return {
    type: POST_ADMIN_LOGOUT_SUCCESS,
    payLoad,
  };
};
export const postAdminLogoutFail = (payLoad) => {
  return {
    type: POST_ADMIN_LOGOUT_FAIL,
    payLoad,
  };
};
// ===========================================================================

export const postAdminRegister = (payLoad) => {
  return {
    type: POST_ADMIN_REGISTER,
    payLoad,
  };
};
export const postAdminRegisterSuccess = (payLoad) => {
  return {
    type: POST_ADMIN_REGISTER_SUCCESS,
    payLoad,
  };
};
export const postAdminRegisterFail = (payLoad) => {
  return {
    type: POST_ADMIN_REGISTER_FAIL,
    payLoad,
  };
};
// ===========================================================================
export const putAdminProfile = (payLoad) => {
  return {
    type: PUT_ADMIN_PROFILE,
    payLoad,
  };
};
export const putAdminProfileSuccess = (payLoad) => {
  return {
    type: PUT_ADMIN_PROFILE_SUCCESS,
    payLoad,
  };
};
export const putAdminProfileFail = (payLoad) => {
  return {
    type: PUT_ADMIN_PROFILE_FAIL,
    payLoad,
  };
};

// ===========================================================================
// ===========================================================================
export const getAdmins = () => {
  return {
    type: GET_ADMINS,
  };
};
export const getAdminsSuccess = (payLoad) => {
  return {
    type: GET_ADMINS_SUCCESS,
    payLoad,
  };
};
export const getAdminsFail = (payLoad) => {
  return {
    type: GET_ADMINS_FAIL,
    payLoad,
  };
};
//============================================================================
export const deleteAdmin = (payLoad) => {
  return {
    type: DELETE_ADMIN,
    payLoad,
  };
};
export const deleteAdminSuccess = (payLoad) => {
  return {
    type: DELETE_ADMIN_SUCCESS,
    payLoad,
  };
};
export const deleteAdminFail = (payLoad) => {
  return {
    type: DELETE_ADMIN_FAIL,
    payLoad,
  };
};
//============================================================================

export const getSelectedAdminBySuperAdmin = (payLoad) => {
  return {
    type: GET_SELECTED_ADMIN_By_SUPER_ADMIN,
    payLoad,
  };
};
export const getSelectedAdminBySuperAdminSuccess = (payLoad) => {
  return {
    type: GET_SELECTED_ADMIN_By_SUPER_ADMIN_SUCCESS,
    payLoad,
  };
};
export const getSelectedAdminBySuperAdminFail = (payLoad) => {
  return {
    type: GET_SELECTED_ADMIN_By_SUPER_ADMIN_FAIL,
    payLoad,
  };
};
//============================================================================

export const putAdmin = (payLoad) => {
  return {
    type: PUT_ADMIN,
    payLoad,
  };
};
export const putAdminSuccess = (payLoad) => {
  return {
    type: PUT_ADMIN_SUCCESS,
    payLoad,
  };
};
export const putAdminFail = (payLoad) => {
  return {
    type: PUT_ADMIN_FAIL,
    payLoad,
  };
};
