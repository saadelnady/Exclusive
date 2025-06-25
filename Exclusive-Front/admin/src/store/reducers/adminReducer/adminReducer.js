import {
  GET_ADMIN,
  GET_ADMIN_SUCCESS,
  GET_ADMIN_FAIL,
  GET_ADMIN_PROFILE,
  GET_ADMIN_PROFILE_SUCCESS,
  GET_ADMIN_PROFILE_FAIL,
  GET_ADMINS,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_FAIL,
  POST_ADMIN_LOGIN,
  POST_ADMIN_LOGIN_SUCCESS,
  POST_ADMIN_LOGIN_FAIL,
  POST_ADMIN_LOGOUT,
  POST_ADMIN_LOGOUT_SUCCESS,
  POST_ADMIN_LOGOUT_FAIL,
  POST_ADMIN_REGISTER,
  POST_ADMIN_REGISTER_SUCCESS,
  POST_ADMIN_REGISTER_FAIL,
  PUT_ADMIN_PROFILE,
  PUT_ADMIN_PROFILE_SUCCESS,
  PUT_ADMIN_PROFILE_FAIL,
  DELETE_ADMIN,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_FAIL,
  POST_ADD_ADMIN,
  POST_ADD_ADMIN_SUCCESS,
  POST_ADD_ADMIN_FAIL,
  GET_SELECTED_ADMIN_By_SUPER_ADMIN,
  GET_SELECTED_ADMIN_By_SUPER_ADMIN_SUCCESS,
  GET_SELECTED_ADMIN_By_SUPER_ADMIN_FAIL,
  PUT_ADMIN,
  PUT_ADMIN_SUCCESS,
  PUT_ADMIN_FAIL,
} from "@/store/actions/admin/actionTypes";

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  error: null,
  admin: {},
  admins: [],
  selectedAdminBySuperAdmin: {},
  message: "",
  total: 0,
  currentPage: 1,
  pageSize: 10,
  totalPages: 0,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMIN_PROFILE:
      return { ...state, isLoading: true };

    case GET_ADMIN_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        admin: action.payLoad,
        error: null,
      };

    case GET_ADMIN_PROFILE_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action.payLoad,
      };
    // ====================================================================================================

    case GET_ADMIN:
      return { ...state, isLoading: true };

    case GET_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        admin: action?.payLoad,
        error: null,
      };

    case GET_ADMIN_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action.payLoad,
      };
    // ====================================================================================================

    case GET_ADMINS:
      return { ...state, isLoading: true };

    case GET_ADMINS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        admins: action?.payLoad?.admins,
        total: action?.payLoad?.total,
        currentPage: action?.payLoad?.currentPage,
        pageSize: action?.payLoad?.pageSize,
        totalPages: action?.payLoad?.totalPages,
        error: null,
      };

    case GET_ADMINS_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action.payLoad,
      };

    // ====================================================================================================

    case POST_ADD_ADMIN:
      return { ...state, isLoading: true };

    case POST_ADD_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        admins: [...state.admins, action?.payLoad?.admin],
        error: null,
      };

    case POST_ADD_ADMIN_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action.payLoad,
      };

    // ====================================================================================================
    case POST_ADMIN_LOGIN:
      return {
        ...state,
        isLoading: true,
      };
    case POST_ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        error: null,
      };
    case POST_ADMIN_LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action?.payLoad,
      };
    // ====================================================================================================
    case POST_ADMIN_LOGOUT:
      return {
        ...state,
        isLoading: true,
      };
    case POST_ADMIN_LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        admin: {},
        error: null,
      };
    case POST_ADMIN_LOGOUT_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        error: action?.payLoad,
      };

    // ====================================================================================================
    case POST_ADMIN_REGISTER:
      return {
        ...state,
      };
    case POST_ADMIN_REGISTER_SUCCESS:
      return {
        ...state,
        message: action?.payLoad?.message,
        error: null,
      };

    case POST_ADMIN_REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        error: action.payLoad,
      };

    // ====================================================================================================
    case PUT_ADMIN_PROFILE:
      return {
        ...state,
        isLoading: true,
      };
    case PUT_ADMIN_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        admin: action?.payLoad?.data?.admin,
        error: null,
      };

    case PUT_ADMIN_PROFILE_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        error: action.payLoad,
      };
    // ====================================================================================================
    case DELETE_ADMIN:
      return {
        ...state,
      };
    case DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        admins: action?.payLoad?.admins,
        total: action?.payLoad?.total,
        currentPage: action?.payLoad?.currentPage,
        pageSize: action?.payLoad?.pageSize,
        totalPages: action?.payLoad?.totalPages,
        message: action?.payLoad?.message,
        error: null,
      };

    case DELETE_ADMIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        error: action.payLoad,
      };

    // ====================================================================================================
    case GET_SELECTED_ADMIN_By_SUPER_ADMIN:
      return {
        ...state,
        isLoading: true,
      };
    case GET_SELECTED_ADMIN_By_SUPER_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectedAdminBySuperAdmin: action?.payLoad,
        error: null,
      };
    case GET_SELECTED_ADMIN_By_SUPER_ADMIN_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action.payLoad,
      };
    // ====================================================================================================
    case PUT_ADMIN:
      return {
        ...state,
        isLoading: true,
      };
    case PUT_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectedAdmin: action?.payLoad?.admin,
        error: null,
      };

    case PUT_ADMIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        error: action.payLoad,
      };
    default:
      return state;
  }
};

export { adminReducer };
