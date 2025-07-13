import { getData } from "../../../API/API";

import {
  getAllStatistics,
  getAllStatisticsFail,
  getAllStatisticsSuccess,
} from "./statisticsActionsCreators";

// ========================================================================================

export const fetchStatistics = () => {
  return async (dispatch) => {
    dispatch(getAllStatistics());
    try {
      const response = await getData(`/api/admin/statistics`);
      dispatch(getAllStatisticsSuccess(response?.data?.statistics));
    } catch (error) {
      dispatch(getAllStatisticsFail(error));
    }
  };
};
