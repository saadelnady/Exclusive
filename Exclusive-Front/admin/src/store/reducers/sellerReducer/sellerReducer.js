import {
  SELLERS_ACTIONS_TYPES,
  SELLER_ACTIONS_TYPES,
} from "../../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  error: null,
  seller: {},
  sellers: [],
  message: "",
};

const sellerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELLER_ACTIONS_TYPES.GET_SELLER:
      return { ...state, isLoading: true };

    case SELLER_ACTIONS_TYPES.GET_SELLER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        seller: action.payLoad,
        error: null,
      };

    case SELLER_ACTIONS_TYPES.GET_SELLER_FAIL:
      return { ...state, error: action.payLoad, isLoggedIn: false };
    // ======================================================================================
    case SELLER_ACTIONS_TYPES.GET_SELLER_PROFILE:
      return { ...state, isLoading: true };

    case SELLER_ACTIONS_TYPES.GET_SELLER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        seller: action?.payLoad,
        error: null,
      };

    case SELLER_ACTIONS_TYPES.GET_SELLER_PROFILE_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action?.payLoad,
      };
    // ======================================================================================
    case SELLER_ACTIONS_TYPES.POST_SELLER_LOGIN:
      return { ...state, isLoading: true };

    case SELLER_ACTIONS_TYPES.POST_SELLER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        error: null,
      };

    case SELLER_ACTIONS_TYPES.POST_SELLER_LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action?.payLoad,
      };
    // ======================================================================================
    case SELLER_ACTIONS_TYPES.POST_SELLER_LOGOUT:
      return {
        ...state,
        isLoading: true,
      };
    case SELLER_ACTIONS_TYPES.POST_SELLER_LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        seller: {},
        error: null,
      };
    case SELLER_ACTIONS_TYPES.POST_SELLER_LOGOUT_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        error: action?.payLoad,
      };
    // ======================================================================================
    case SELLER_ACTIONS_TYPES.POST_SELLER_REGISTER:
      return {
        ...state,
      };
    case SELLER_ACTIONS_TYPES.POST_SELLER_REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,

        message: action?.payLoad?.message,
        error: null,
      };

    case SELLER_ACTIONS_TYPES.POST_SELLER_REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        error: action.payLoad,
      };
    // ======================================================================================

    case SELLERS_ACTIONS_TYPES.GET_SELLERS:
      return { ...state, isLoading: true };

    case SELLERS_ACTIONS_TYPES.GET_SELLERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sellers: action.payLoad,
        error: null,
      };
    case SELLERS_ACTIONS_TYPES.GET_SELLERS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };
    // ====================================================================================================
    case SELLER_ACTIONS_TYPES.PUT_SELLER_PROFILE:
      return { ...state, isLoading: true };

    case SELLER_ACTIONS_TYPES.PUT_SELLER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        seller: action?.payLoad?.data?.seller,
        message: action?.payLoad?.message,
        error: null,
      };

    case SELLER_ACTIONS_TYPES.PUT_SELLER_PROFILE_FAIL:
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
