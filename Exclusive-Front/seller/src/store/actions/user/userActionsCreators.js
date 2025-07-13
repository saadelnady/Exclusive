import {
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  PUT_USER,
  PUT_USER_SUCCESS,
  PUT_USER_FAIL,
  POST_ADD_USER,
  POST_ADD_USER_SUCCESS,
  POST_ADD_USER_FAIL,
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
} from "./actionTypes";

// ===========================================================================
// ===========================================================================

export const postAddUser = (payLoad) => {
  return {
    type: POST_ADD_USER,
    payLoad,
  };
};
export const postAddUserSuccess = (payLoad) => {
  return {
    type: POST_ADD_USER_SUCCESS,
    payLoad,
  };
};
export const postAddUserFail = (payLoad) => {
  return {
    type: POST_ADD_USER_FAIL,
    payLoad,
  };
};
// ===========================================================================

export const getUser = () => {
  return {
    type: GET_USER,
  };
};
export const getUserSuccess = (payLoad) => {
  return {
    type: GET_USER_SUCCESS,
    payLoad,
  };
};
export const getUserFail = (payLoad) => {
  return {
    type: GET_USER_FAIL,
    payLoad,
  };
};
// ===========================================================================
export const getUsers = () => {
  return {
    type: GET_USERS,
  };
};
export const getUsersSuccess = (payLoad) => {
  return {
    type: GET_USERS_SUCCESS,
    payLoad,
  };
};
export const getUsersFail = (payLoad) => {
  return {
    type: GET_USERS_FAIL,
    payLoad,
  };
};
//============================================================================
export const deleteUser = (payLoad) => {
  return {
    type: DELETE_USER,
    payLoad,
  };
};
export const deleteUserSuccess = (payLoad) => {
  return {
    type: DELETE_USER_SUCCESS,
    payLoad,
  };
};
export const deleteUserFail = (payLoad) => {
  return {
    type: DELETE_USER_FAIL,
    payLoad,
  };
};

//============================================================================

export const putUser = (payLoad) => {
  return {
    type: PUT_USER,
    payLoad,
  };
};
export const putUserSuccess = (payLoad) => {
  return {
    type: PUT_USER_SUCCESS,
    payLoad,
  };
};
export const putUserFail = (payLoad) => {
  return {
    type: PUT_USER_FAIL,
    payLoad,
  };
};
