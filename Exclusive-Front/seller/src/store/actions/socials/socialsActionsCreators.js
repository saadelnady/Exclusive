// ===========================================================================
// social
// ===========================================================================

import {
  DELETE_SOCIAL,
  DELETE_SOCIAL_FAIL,
  DELETE_SOCIAL_SUCCESS,
  GET_SOCIAL,
  GET_SOCIAL_FAIL,
  GET_SOCIAL_SUCCESS,
  GET_SOCIALS,
  GET_SOCIALS_FAIL,
  GET_SOCIALS_SUCCESS,
  POST_ADD_SOCIAL,
  POST_ADD_SOCIAL_FAIL,
  POST_ADD_SOCIAL_SUCCESS,
  PUT_SOCIAL,
  PUT_SOCIAL_FAIL,
  PUT_SOCIAL_SUCCESS,
} from "./actionTypes";

export const getSocial = (payLoad) => {
  return {
    type: GET_SOCIAL,
    payLoad,
  };
};
export const getSocialSuccess = (payLoad) => {
  return {
    type: GET_SOCIAL_SUCCESS,
    payLoad,
  };
};
export const getSocialFail = (payLoad) => {
  return {
    type: GET_SOCIAL_FAIL,
    payLoad,
  };
};
// ===========================================================================
// ===========================================================================

export const postAddSocial = (payLoad) => {
  return {
    type: POST_ADD_SOCIAL,
    payLoad,
  };
};
export const postAddSocialSuccess = (payLoad) => {
  return {
    type: POST_ADD_SOCIAL_SUCCESS,
    payLoad,
  };
};
export const postAddSocialFail = (payLoad) => {
  return {
    type: POST_ADD_SOCIAL_FAIL,
    payLoad,
  };
};

// ===========================================================================
export const getSocials = (payLoad) => {
  return {
    type: GET_SOCIALS,
    payLoad,
  };
};
export const getSocialsSuccess = (payLoad) => {
  return {
    type: GET_SOCIALS_SUCCESS,
    payLoad,
  };
};
export const getSocialsFail = (payLoad) => {
  return {
    type: GET_SOCIALS_FAIL,
    payLoad,
  };
};
//============================================================================
export const deleteSocial = (payLoad) => {
  return {
    type: DELETE_SOCIAL,
    payLoad,
  };
};
export const deleteSocialSuccess = (payLoad) => {
  return {
    type: DELETE_SOCIAL_SUCCESS,
    payLoad,
  };
};
export const deleteSocialFail = (payLoad) => {
  return {
    type: DELETE_SOCIAL_FAIL,
    payLoad,
  };
};

//============================================================================

export const putSocial = (payLoad) => {
  return {
    type: PUT_SOCIAL,
    payLoad,
  };
};
export const putSocialSuccess = (payLoad) => {
  return {
    type: PUT_SOCIAL_SUCCESS,
    payLoad,
  };
};
export const putSocialFail = (payLoad) => {
  return {
    type: PUT_SOCIAL_FAIL,
    payLoad,
  };
};
