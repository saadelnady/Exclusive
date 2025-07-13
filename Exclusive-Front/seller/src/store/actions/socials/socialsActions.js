import { toast } from "react-toastify";
import { deleteData, getData, postData, putData } from "../../../API/API";

import { showToast } from "../../../helpers/toast_helper";

import * as actionCreators from "./socialsActionsCreators";

// ========================================================================================
export const fetchSocial = ({ socialId }) => {
  return async (dispatch) => {
    dispatch(actionCreators.getSocial());
    try {
      const response = await getData(`/api/admin/${socialId}`);
      dispatch(actionCreators.getSocialSuccess(response?.data));
    } catch (error) {
      dispatch(actionCreators.getSocialFail(error));
    }
  };
};

// ========================================================================================
export const postAddSocial = ({ data, toast, locale }) => {
  return async (dispatch) => {
    dispatch(actionCreators.postAddSocial());

    try {
      const response = await postData("/api/settings/socials", data);

      dispatch(actionCreators.postAddSocialSuccess(response?.data));
      showToast(toast, response?.message?.[locale], "success");
    } catch (error) {
      dispatch(actionCreators.postAddSocialFail(error));
      showToast(toast, error?.response?.data?.message?.[locale], "error");
    }
  };
};

// ========================================================================================

export const fetchSocials = (locale) => {
  return async (dispatch) => {
    dispatch(actionCreators.getSocials());
    try {
      const data = await getData(`/api/settings/socials`);

      dispatch(actionCreators.getSocialsSuccess(data?.data?.socials));
    } catch (error) {
      toast.error(error?.response?.data?.message?.[locale]);
      dispatch(actionCreators.getSocialsFail(error));
    }
  };
};
// ========================================================================================

export const deleteSocial = ({ socialId, locale, toast }) => {
  return async (dispatch) => {
    dispatch(actionCreators.deleteSocial());
    try {
      const response = await deleteData(`/api/settings/socials/${socialId}`);

      dispatch(actionCreators.deleteSocialSuccess(response?.data));
      showToast(toast, response?.message?.[locale], "success");
    } catch (error) {
      showToast(toast, error?.response?.data?.message?.[locale], "error");
      dispatch(actionCreators.deleteSocialFail(error));
    }
  };
};

// ========================================================================================

export const editSocial = ({ socialId, data, toast, locale }) => {
  return async (dispatch) => {
    dispatch(actionCreators.putSocial());
    try {
      const response = await putData(`/api/settings/socials/${socialId}`, data);
      dispatch(actionCreators.putSocialSuccess(response?.data));
      showToast(toast, response?.message?.[locale], "success");
    } catch (error) {
      dispatch(actionCreators.putSocialFail(error));
      showToast(toast, error?.response?.data?.message?.[locale], "error");
    }
  };
};
