import {
  GET_ALL_STATISTICS,
  GET_ALL_STATISTICS_SUCCESS,
  GET_ALL_STATISTICS_FAIL,
} from "./actionTypes";

// ===========================================================================
// statistics
// ===========================================================================

export const getAllStatistics = (payLoad) => {
  return {
    type: GET_ALL_STATISTICS,
    payLoad,
  };
};
export const getAllStatisticsSuccess = (payLoad) => {
  return {
    type: GET_ALL_STATISTICS_SUCCESS,
    payLoad,
  };
};
export const getAllStatisticsFail = (payLoad) => {
  return {
    type: GET_ALL_STATISTICS_FAIL,
    payLoad,
  };
};
