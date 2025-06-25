import { toast } from "react-toastify";
import { deleteData, getData, postData, putData } from "../../../API/API";

import { showToast } from "../../../helpers/toast_helper";

import * as actionCreators from "./adminActionsCreators";
// ========================================================================================

export const fetchAdminProfile = () => {
  return async (dispatch) => {
    dispatch(actionCreators.getAdminProfile());
    try {
      const response = await getData(`/api/admin/getProfile`);
      dispatch(actionCreators.getAdminProfileSuccess(response?.data?.admin));
    } catch (error) {
      dispatch(actionCreators.getAdminProfileFail(error));
    }
  };
};
// ========================================================================================
export const fetchAdmin = ({ adminId }) => {
  return async (dispatch) => {
    dispatch(actionCreators.getAdmin());
    try {
      const response = await getData(`/api/admin/${adminId}`);
      dispatch(actionCreators.getAdminSuccess(response?.data?.admin));
    } catch (error) {
      dispatch(actionCreators.getAdminFail(error));
    }
  };
};
// ========================================================================================

export const adminLogin = ({ values, toast, navigate, locale }) => {
  return async (dispatch) => {
    dispatch(actionCreators.postAdminLogin(values));
    try {
      const response = await postData(`/api/admin/login`, values);

      localStorage.setItem("TOKEN", response?.data?.token);
      dispatch(actionCreators.postAdminLoginSuccess(response?.data));
      showToast(toast, response?.message?.[locale], "success");
      dispatch(fetchAdminProfile());
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2500);
    } catch (error) {
      dispatch(actionCreators.postAdminLoginFail(error));
      showToast(toast, error?.response?.data?.message?.[locale], "error");
    }
  };
};
// ========================================================================================

export const adminLogout = ({ toast, navigate, role }) => {
  return async (dispatch) => {
    dispatch(actionCreators.postAdminLogout());

    try {
      dispatch(actionCreators.postAdminLogoutSuccess());
      localStorage.removeItem("TOKEN");
      showToast(toast, "You have logged out successfully", "success");

      setTimeout(() => {
        if (role === "ADMIN") {
          navigate("/login");
        }
        if (role === "USER") {
          navigate("/");
        }
      }, 2500);
    } catch (error) {
      dispatch(actionCreators.postAdminLogoutFail());
      showToast(toast, "Something wrong when logout", "error");
    }
  };
};
// ========================================================================================
export const adminRegister = ({ values, toast, navigate }) => {
  return async (dispatch) => {
    dispatch(actionCreators.postAdminRegister(values));

    try {
      const response = await postData("/api/admins/register", values);

      // localStorage.setItem("TOKEN", response?.data?.token);
      dispatch(actionCreators.postAdminRegisterSuccess(response));
      showToast(toast, response?.message, "success");
      navigate("/login");

      // setTimeout(() => {
      //   if (localStorage.getItem("TOKEN")) {
      //   }
      // });
    } catch (error) {
      dispatch(actionCreators.postAdminRegisterFail(error));
      showToast(toast, error?.response?.data?.message, "error");
    }
  };
};
// ========================================================================================
export const postAddAdmin = ({ data, toast, navigate, locale }) => {
  return async (dispatch) => {
    dispatch(actionCreators.postAddAdmin(data));

    try {
      const response = await postData("/api/admin/all-admins", data);

      dispatch(actionCreators.postAddAdminSuccess(response));
      showToast(toast, response?.message?.[locale], "success");
      navigate("/admins");
    } catch (error) {
      dispatch(actionCreators.postAddAdminFail(error));
      showToast(toast, error?.response?.data?.message?.[locale], "error");
    }
  };
};
// ========================================================================================
export const editAdminProfile = ({ adminId, data, toast, locale }) => {
  return async (dispatch) => {
    dispatch(actionCreators.putAdmin());
    try {
      const response = await putData(`/api/admin/${adminId}`, data);
      dispatch(actionCreators.putAdminProfileSuccess(response));
      showToast(toast, response?.message?.[locale], "success");
    } catch (error) {
      dispatch(actionCreators.putAdminProfileFail(error));
      showToast(toast, error?.response?.data?.message?.[locale], "error");
    }
  };
};
// ========================================================================================

export const fetchAdmins = ({ limit = "", page = "", text = "", locale }) => {
  return async (dispatch) => {
    dispatch(actionCreators.getAdmins());
    try {
      let data;
      if (text) {
        data = await getData(
          `/api/admin/all-admins?limit=${limit}&page=${page}&text=${text}`
        );
      } else {
        data = await getData(
          `/api/admin/all-admins?limit=${limit}&page=${page}`
        );
      }

      dispatch(actionCreators.getAdminsSuccess(data?.data));
    } catch (error) {
      toast.error(error?.response?.data?.message?.[locale]);
      dispatch(actionCreators.getAdminsFail(error));
    }
  };
};
// ========================================================================================

export const deleteAdmin = ({ adminId, locale, toast }) => {
  return async (dispatch) => {
    dispatch(actionCreators.deleteAdmin());
    try {
      const data = await deleteData(`/api/admin/${adminId}`);

      dispatch(actionCreators.deleteAdminSuccess(data));
      showToast(toast, data?.message?.[locale], "success");
    } catch (error) {
      showToast(toast, error?.response?.data?.message?.[locale], "error");
      dispatch(actionCreators.deleteAdminFail(error));
    }
  };
};
// ========================================================================================
export const fetchSelectedAdminBySuperAdmin = ({ adminId }) => {
  return async (dispatch) => {
    dispatch(actionCreators.getSelectedAdminBySuperAdmin());
    try {
      const response = await getData(`/api/admin/${adminId}`);
      dispatch(
        actionCreators.getSelectedAdminBySuperAdminSuccess(
          response?.data?.admin
        )
      );
    } catch (error) {
      dispatch(actionCreators.getSelectedAdminBySuperAdminFail(error));
    }
  };
};
// ========================================================================================

export const editAdmin = ({ adminId, data, toast, locale, navigate }) => {
  return async (dispatch) => {
    dispatch(actionCreators.putAdmin());
    try {
      const response = await putData(`/api/admin/${adminId}`, data);
      dispatch(actionCreators.putAdminSuccess(response));
      showToast(toast, response?.message?.[locale], "success");
      navigate("/admins");
    } catch (error) {
      dispatch(actionCreators.putAdminFail(error));
      showToast(toast, error?.response?.data?.message?.[locale], "error");
    }
  };
};
