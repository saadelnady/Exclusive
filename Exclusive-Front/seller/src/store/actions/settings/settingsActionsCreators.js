import {
  GET_SETTINGS,
  GET_SETTINGS_SUCCESS,
  GET_SETTINGS_FAIL,
  PUT_SETTINGS,
  PUT_SETTINGS_SUCCESS,
  PUT_SETTINGS_FAIL,
} from "./actionTypes";

// ===========================================================================
// ===========================================================================

export const getSettings = (payLoad) => {
  return {
    type: GET_SETTINGS,
    payLoad,
  };
};
export const getSettingsSuccess = (payLoad) => {
  return {
    type: GET_SETTINGS_SUCCESS,
    payLoad,
  };
};
export const getSettiingsFail = (payLoad) => {
  return {
    type: GET_SETTINGS_FAIL,
    payLoad,
  };
};

//============================================================================

export const putSettings = (payLoad) => {
  return {
    type: PUT_SETTINGS,
    payLoad,
  };
};
export const putSettingsSuccess = (payLoad) => {
  return {
    type: PUT_SETTINGS_SUCCESS,
    payLoad,
  };
};
export const putSettingsFail = (payLoad) => {
  return {
    type: PUT_SETTINGS_FAIL,
    payLoad,
  };
};
