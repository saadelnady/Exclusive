import {
  DELETE_SOCIAL,
  DELETE_SOCIAL_FAIL,
  DELETE_SOCIAL_SUCCESS,
  GET_SOCIAL,
  GET_SOCIAL_SUCCESS,
  GET_SOCIALS,
  GET_SOCIALS_FAIL,
  GET_SOCIALS_SUCCESS,
  POST_ADD_SOCIAL,
  POST_ADD_SOCIAL_FAIL,
  POST_ADD_SOCIAL_SUCCESS,
  PUT_SOCIAL,
  PUT_SOCIAL_FAIL,
  PUT_SOCIAL_SUCCESS,
} from "@/store/actions/socials/actionTypes";

const initialState = {
  isLoading: false,
  socials: [],
  social: {},
  error: null,
};

const socialsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SOCIALS:
      return { ...state, isLoading: true };

    case GET_SOCIALS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        socials: action?.payLoad,
        error: null,
      };

    case GET_SOCIALS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };
    // ====================================================================================================

    case GET_SOCIAL:
      return { ...state, isLoading: true };

    case GET_SOCIAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        social: action?.payLoad?.socialMedia,

        error: null,
      };

    case GET_SOCIALS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };

    // ====================================================================================================

    case POST_ADD_SOCIAL:
      return { ...state, isLoading: true };

    case POST_ADD_SOCIAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        socials: action?.payLoad?.socials,
        error: null,
      };

    case POST_ADD_SOCIAL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };

    // ====================================================================================================
    case DELETE_SOCIAL:
      return {
        ...state,
      };
    case DELETE_SOCIAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        socials: action?.payLoad?.socials,
        error: null,
      };

    case DELETE_SOCIAL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };

    // ====================================================================================================
    case PUT_SOCIAL:
      return {
        ...state,
        isLoading: true,
      };
    case PUT_SOCIAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        socials: action?.payLoad?.socials,
        error: null,
      };

    case PUT_SOCIAL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };
    default:
      return state;
  }
};

export { socialsReducer };
