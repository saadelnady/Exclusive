import { toast } from "react-toastify";
import { deleteData, getData, postData, putData } from "../../../API/API";

import { showToast } from "../../../helpers/toast_helper";

import * as actionCreators from "./userActionsCreators";

// ========================================================================================

export const fetchUsers = ({ limit = "", page = "", text = "", locale }) => {
  return async (dispatch) => {
    dispatch(actionCreators.getUsers());
    try {
      let response;
      if (text) {
        response = await getData(
          `/api/users?limit=${limit}&page=${page}&text=${text}`
        );
      } else {
        response = await getData(`/api/users?limit=${limit}&page=${page}`);
      }

      dispatch(actionCreators.getUsersSuccess(response?.data));
    } catch (error) {
      toast.error(error?.response?.data?.message?.[locale]);
      dispatch(actionCreators.getUsersFail(error));
    }
  };
};
// ========================================================================================
export const fetchUser = ({ userId }) => {
  return async (dispatch) => {
    dispatch(actionCreators.getUser());
    try {
      const response = await getData(`/api/users/${userId}`);
      dispatch(actionCreators.getUserSuccess(response?.data?.user));
    } catch (error) {
      dispatch(actionCreators.getUserFail(error));
    }
  };
};

// ========================================================================================

export const editUser = ({ userId, data, toast, locale, navigate }) => {
  return async (dispatch) => {
    dispatch(actionCreators.putUser());
    try {
      const response = await putData(`/api/users/${userId}`, data);
      dispatch(actionCreators.putUserSuccess(response));
      showToast(toast, response?.message?.[locale], "success");
      navigate("/users");
    } catch (error) {
      dispatch(actionCreators.putUserFail(error));
      showToast(toast, error?.response?.data?.message?.[locale], "error");
    }
  };
};
// ========================================================================================

export const deleteUser = ({ userId, locale, toast }) => {
  return async (dispatch) => {
    dispatch(actionCreators.deleteUser());
    try {
      const data = await deleteData(`/api/users/${userId}`);

      dispatch(actionCreators.deleteUserSuccess(data));
      showToast(toast, data?.message?.[locale], "success");
    } catch (error) {
      showToast(toast, error?.response?.data?.message?.[locale], "error");
      dispatch(actionCreators.deleteUserFail(error));
    }
  };
};
