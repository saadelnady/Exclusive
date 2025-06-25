import { getData, postData, putData } from "../../../API/API";
import { showToast } from "../../../helpers/toast_helper";
import * as actionCreators from "./sellerActionsCreators";

export const fetchSeller = (sellerId) => {
  return async (dispatch) => {
    dispatch(actionCreators.getSeller(sellerId));
    try {
      const response = await getData(`/api/sellers/${sellerId}`);
      dispatch(actionCreators.getSellerSuccess(response?.data?.seller));
    } catch (error) {
      dispatch(actionCreators.getSellerFail(error));
    }
  };
};
// ========================================================================================

export const fetchSellerProfile = () => {
  return async (dispatch) => {
    dispatch(actionCreators.getSellerProfile());
    try {
      const response = await getData(`/api/sellers/getSellerProfile`);
      dispatch(actionCreators.getSellerProfileSuccess(response?.data?.seller));
    } catch (error) {
      dispatch(actionCreators.getSellerProfileFail(error));
    }
  };
};
// ========================================================================================
export const editSellerProfile = ({ sellerId, values, toast }) => {
  return async (dispatch) => {
    dispatch(actionCreators.putSellerProfile());
    try {
      const response = await putData(`/api/sellers/${sellerId}`, values);
      dispatch(actionCreators.putSellerProfileSuccess(response));
      showToast(toast, response?.message, "success");
    } catch (error) {
      dispatch(actionCreators.putSellerProfileFail(error));
      showToast(toast, error?.response?.data?.message, "error");
    }
  };
};
// ========================================================================================

export const sellerLogin = ({ values, toast, navigate }) => {
  return async (dispatch) => {
    dispatch(actionCreators.postSellerLogin(values));
    try {
      const response = await postData(`/api/sellers/login`, values);

      dispatch(actionCreators.postSellerLoginSuccess(response?.data));
      localStorage.setItem("TOKEN", response?.data?.token);
      showToast(toast, response?.message, "success");
      setTimeout(() => {
        if (localStorage.getItem("TOKEN")) {
          navigate("/seller");
        }
      }, 2500);
    } catch (error) {
      dispatch(actionCreators.postSellerLoginFail(error));
      showToast(toast, error?.response?.data?.message, "error");
    }
  };
};
// ========================================================================================

export const sellerLogout = ({ toast, navigate }) => {
  return async (dispatch) => {
    dispatch(actionCreators.postSellerLogout());

    try {
      dispatch(actionCreators.postSellerLogoutSuccess());
      localStorage.removeItem("TOKEN");
      showToast(toast, "You have logged out successfully", "success");

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (error) {
      dispatch(actionCreators.postSellerLogoutFail());
      showToast(toast, "Something wrong when logout", "error");
    }
  };
};
// ========================================================================================
export const sellerRegister = ({ values, toast, navigate }) => {
  return async (dispatch) => {
    dispatch(actionCreators.postSellerRegister(values));

    try {
      const response = await postData("/api/sellers/register", values);
      dispatch(actionCreators.postSellerRegisterSuccess(response));
      // localStorage.setItem("TOKEN", response?.data?.token);
      navigate("/seller/login");
      showToast(toast, response?.message, "success");
      // setTimeout(() => {
      //   if (localStorage.getItem("TOKEN")) {
      //   }
      // }, 2500);
    } catch (error) {
      dispatch(actionCreators.postSellerRegisterFail(error));
      showToast(toast, error?.response?.data?.message, "error");
    }
  };
};

// =========================================================================================
export const fetchSellers = () => {
  return async (dispatch) => {
    dispatch(actionCreators.getSellers());
    try {
      const response = await getData(`/api/sellers`);
      dispatch(actionCreators.getSellersSuccess(response?.data?.sellers));
    } catch (error) {
      dispatch(actionCreators.getSellersFail(error));
    }
  };
};
