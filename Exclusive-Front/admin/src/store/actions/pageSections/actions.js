import { toast } from "react-toastify";
import { getData, putData } from "../../../API/API";

import { showToast } from "../../../helpers/toast_helper";

import * as actionCreators from "./actionsCreators";

export const fetchPageSection = ({ pageSlug, sectionSlug }) => {
  return async (dispatch) => {
    dispatch(actionCreators.getPageSection());
    try {
      const response = await getData(
        `/api/pages/${pageSlug}/sections/${sectionSlug}`
      );

      dispatch(actionCreators.getPageSectionSuccess(response?.data?.section));
    } catch (error) {
      dispatch(actionCreators.getPageSectionFail(error));
    }
  };
};
// ========================================================================================

export const editPageSection = ({
  pageSlug,
  sectionSlug,
  data,
  toast,
  locale,
}) => {
  return async (dispatch) => {
    dispatch(actionCreators.putPageSection());
    try {
      const response = await putData(
        `/api/pages/${pageSlug}/sections/${sectionSlug}`,
        data
      );
      dispatch(actionCreators.putPageSectionSuccess(response?.data?.section));
      showToast(toast, response?.message?.[locale], "success");
    } catch (error) {
      dispatch(actionCreators.putPageSectionFail(error));
      showToast(toast, error?.response?.data?.message?.[locale], "error");
    }
  };
};
