import {
  DELETE_USER,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  GET_USER,
  GET_USER_FAIL,
  GET_USER_SUCCESS,
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  POST_ADD_USER,
  POST_ADD_USER_FAIL,
  POST_ADD_USER_SUCCESS,
  PUT_USER,
  PUT_USER_FAIL,
  PUT_USER_SUCCESS,
} from "@/store/actions/user/actionTypes";

const initialState = {
  isLoading: false,
  error: null,
  user: {},
  users: [],
  total: 0,
  currentPage: 1,
  pageSize: 10,
  totalPages: 0,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, isLoading: true };

    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action?.payLoad,
        error: null,
      };

    case GET_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };
    // ====================================================================================================

    case GET_USERS:
      return { ...state, isLoading: true };

    case GET_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action?.payLoad?.users,
        total: action?.payLoad?.total,
        currentPage: action?.payLoad?.currentPage,
        pageSize: action?.payLoad?.pageSize,
        totalPages: action?.payLoad?.totalPages,
        error: null,
      };

    case GET_USERS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };

    // ====================================================================================================

    case POST_ADD_USER:
      return { ...state, isLoading: true };

    case POST_ADD_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: [...state.users, action?.payLoad?.user],
        error: null,
      };

    case POST_ADD_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };

    // ====================================================================================================
    case DELETE_USER:
      return {
        ...state,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action?.payLoad?.users,
        total: action?.payLoad?.total,
        currentPage: action?.payLoad?.currentPage,
        pageSize: action?.payLoad?.pageSize,
        totalPages: action?.payLoad?.totalPages,
        error: null,
      };

    case DELETE_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };

    // ====================================================================================================
    case PUT_USER:
      return {
        ...state,
        isLoading: true,
      };
    case PUT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action?.payLoad?.user,
        error: null,
      };

    case PUT_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };
    default:
      return state;
  }
};

export { userReducer };
