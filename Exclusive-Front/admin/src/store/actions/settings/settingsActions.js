import { toast } from "react-toastify";
import { getData, putData } from "../../../API/API";

import { showToast } from "../../../helpers/toast_helper";

import * as actionCreators from "./settingsActionsCreators";

// ========================================================================================

export const fetchSettings = ({ locale, toast }) => {
  return async (dispatch) => {
    dispatch(actionCreators.getSettings());
    try {
      const response = await getData(`/api/settings`);
      dispatch(actionCreators.getSettingsSuccess(response?.data));
      showToast(toast, response?.message?.[locale], "success");
    } catch (error) {
      toast.error(error?.response?.data?.message?.[locale]);
      dispatch(actionCreators.getSettiingsFail(error));
    }
  };
};
// ========================================================================================

export const editSettings = ({ data, toast, locale }) => {
  return async (dispatch) => {
    dispatch(actionCreators.putSettings());
    try {
      const response = await putData(`/api/settings`, data);
      dispatch(actionCreators.putSettingsSuccess(response));
      showToast(toast, response?.message?.[locale], "success");
    } catch (error) {
      dispatch(actionCreators.putSettingsFail(error));
      showToast(toast, error?.response?.data?.message?.[locale], "error");
    }
  };
};
// ========================================================================================
