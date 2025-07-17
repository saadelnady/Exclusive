import {
  GET_SELLER,
  GET_SELLER_FAIL,
  GET_SELLER_PROFILE,
  GET_SELLER_PROFILE_FAIL,
  GET_SELLER_PROFILE_SUCCESS,
  GET_SELLER_SUCCESS,
  GET_SELLERS,
  GET_SELLERS_FAIL,
  GET_SELLERS_SUCCESS,
  POST_SELLER_LOGIN,
  POST_SELLER_LOGIN_FAIL,
  POST_SELLER_LOGIN_SUCCESS,
  POST_SELLER_LOGOUT,
  POST_SELLER_LOGOUT_FAIL,
  POST_SELLER_LOGOUT_SUCCESS,
  POST_SELLER_OTP,
  POST_SELLER_OTP_FAIL,
  POST_SELLER_OTP_SUCCESS,
  POST_SELLER_REGISTER,
  POST_SELLER_REGISTER_FAIL,
  POST_SELLER_REGISTER_SUCCESS,
  POST_SELLER_RESEND_OTP,
  POST_SELLER_RESEND_OTP_FAIL,
  POST_SELLER_RESEND_OTP_SUCCESS,
  PUT_SELLER_PROFILE,
  PUT_SELLER_PROFILE_FAIL,
  PUT_SELLER_PROFILE_SUCCESS,
} from "@/store/actions/seller/actionTypes";

const initialState = {
  isLoading: false,
  error: null,
  seller: {},
  sellers: [],
  total: 0,
  currentPage: 1,
  pageSize: 10,
  totalPages: 0,
  message: "",
};

const sellerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER:
      return { ...state, isLoading: true };

    case GET_SELLER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        seller: action.payLoad,
        error: null,
      };

    case GET_SELLER_FAIL:
      return { ...state, error: action.payLoad, isLoggedIn: false };
    // ======================================================================================
    case GET_SELLER_PROFILE:
      return { ...state, isLoading: true };

    case GET_SELLER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        seller: action?.payLoad,
        error: null,
      };

    case GET_SELLER_PROFILE_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action?.payLoad,
      };
    // ======================================================================================
    case POST_SELLER_LOGIN:
      return { ...state, isLoading: true };

    case POST_SELLER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        error: null,
      };

    case POST_SELLER_LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action?.payLoad,
      };
    // ======================================================================================
    case POST_SELLER_OTP:
      return { ...state, isLoading: true };

    case POST_SELLER_OTP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };

    case POST_SELLER_OTP_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action?.payLoad,
      };
    // ======================================================================================
    case POST_SELLER_RESEND_OTP:
      return { ...state, isLoading: true };

    case POST_SELLER_RESEND_OTP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };

    case POST_SELLER_RESEND_OTP_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action?.payLoad,
      };
    // ======================================================================================
    case POST_SELLER_LOGOUT:
      return {
        ...state,
        isLoading: true,
      };
    case POST_SELLER_LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        seller: {},
        error: null,
      };
    case POST_SELLER_LOGOUT_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        error: action?.payLoad,
      };
    // ======================================================================================
    case POST_SELLER_REGISTER:
      return {
        ...state,
        isLoading: true,
      };
    case POST_SELLER_REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action?.payLoad?.message,
        error: null,
      };

    case POST_SELLER_REGISTER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };
    // ======================================================================================

    case GET_SELLERS:
      return { ...state, isLoading: true };

    case GET_SELLERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sellers: action?.payLoad?.sellers,
        error: null,
        total: action?.payLoad?.total,
        currentPage: action?.payLoad?.currentPage,
        pageSize: action?.payLoad?.pageSize,
        totalPages: action?.payLoad?.totalPages,
      };
    case GET_SELLERS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };
    // ====================================================================================================
    case PUT_SELLER_PROFILE:
      return { ...state, isLoading: true };

    case PUT_SELLER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        seller: action?.payLoad?.data?.seller,
        message: action?.payLoad?.message,
        error: null,
      };

    case PUT_SELLER_PROFILE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
        message: action.payLoad,
      };
    // ======================================================================================

    default:
      return state;
  }
};
export { sellerReducer };
