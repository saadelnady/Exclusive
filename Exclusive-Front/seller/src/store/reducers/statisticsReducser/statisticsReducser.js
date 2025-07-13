import {
  GET_ALL_STATISTICS,
  GET_ALL_STATISTICS_FAIL,
  GET_ALL_STATISTICS_SUCCESS,
} from "@/store/actions/statistics/actionTypes";

const initialState = {
  statistics: {},
  isLoading: false,
  error: null,
};

const statisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_STATISTICS:
      return { ...state, isLoading: true };
    case GET_ALL_STATISTICS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        statistics: action.payLoad,
        error: null,
      };
    case GET_ALL_STATISTICS_FAIL:
      return { ...state, isLoading: false, error: action.payLoad };
    default:
      return state;
  }
};

export { statisticsReducer };
