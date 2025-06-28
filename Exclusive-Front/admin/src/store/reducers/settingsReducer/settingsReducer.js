import {
  GET_SETTINGS,
  GET_SETTINGS_FAIL,
  GET_SETTINGS_SUCCESS,
  PUT_SETTINGS,
  PUT_SETTINGS_FAIL,
  PUT_SETTINGS_SUCCESS,
} from "@/store/actions/settings/actionTypes";

const initialState = {
  isLoading: false,
  error: null,
  settings: {},
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SETTINGS:
      return { ...state, isLoading: true };

    case GET_SETTINGS_SUCCESS:
      console.log("action?.payLoad?.settings", action?.payLoad?.settings?.[0]);

      return {
        ...state,
        isLoading: false,
        settings: action?.payLoad?.settings?.[0],
        error: null,
      };

    case GET_SETTINGS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };

    // ====================================================================================================
    case PUT_SETTINGS:
      return {
        ...state,
        isLoading: true,
      };
    case PUT_SETTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        settings: action?.payLoad?.settings,
        error: null,
      };

    case PUT_SETTINGS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };
    default:
      return state;
  }
};

export { settingsReducer };
