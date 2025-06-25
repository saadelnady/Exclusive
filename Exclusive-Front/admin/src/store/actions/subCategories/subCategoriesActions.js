import { deleteData, getData, postData, putData } from "../../../API/API";
import { showToast } from "../../../helpers/toast_helper";
import * as actionsCreators from "./subCategoriesActionsCreator";
export const fetchSubCategories = ({
  limit = "",
  page = "",
  text = "",
  locale,
} = {}) => {
  return async (dispatch) => {
    dispatch(actionsCreators.getSubCategories());
    try {
      let response = "";
      if (text) {
        response = await getData(
          `/api/subCategories?limit=${limit}&page=${page}&text=${text}`
        );
      } else {
        response = await getData(
          `/api/subCategories?limit=${limit}&page=${page}`
        );
      }

      dispatch(actionsCreators.getSubCategoriesSuccess(response.data));
    } catch (error) {
      dispatch(actionsCreators.getSubCategoriesFail(error));
    }
  };
};
// =========================================================================================

export const fetchSubCategory = (subCategoryId) => {
  return async (dispatch) => {
    dispatch(actionsCreators.getSubCategory(subCategoryId));
    try {
      const response = await getData(`/api/subCategories/${subCategoryId}`);

      dispatch(
        actionsCreators.getSubCategorySuccess(response.data.subCategory)
      );
    } catch (error) {
      dispatch(actionsCreators.getSubCategoryFail(error));
    }
  };
};
// =========================================================================================
export const addSubCategory = ({ formData, toast }) => {
  return async (dispatch) => {
    dispatch(actionsCreators.addSubCategory(formData));
    try {
      const response = await postData(`/api/subCategories`, formData);
      dispatch(actionsCreators.addSubCategorySuccess(response));
      showToast(toast, response?.message, "success");
    } catch (error) {
      dispatch(
        actionsCreators.addSubCategoryFail(error?.response?.data?.message)
      );
      showToast(toast, error?.response?.data?.message, "error");
    }
  };
};
// =========================================================================================
export const editSubCategory = ({ subCategoryId, formData, toast }) => {
  return async (dispatch) => {
    dispatch(actionsCreators.editSubCategory(formData));

    try {
      const response = await putData(
        `/api/subCategories/${subCategoryId}`,
        formData
      );
      dispatch(actionsCreators.editSubCategorySuccess(response));
      showToast(toast, response?.message, "success");
    } catch (error) {
      dispatch(actionsCreators.editSubCategoryFail(error));
      showToast(toast, error?.response?.data?.message, "error");
    }
  };
};
// =========================================================================================

export const deleteSubCategory = ({ subCategoryId, toast, locale }) => {
  return async (dispatch) => {
    dispatch(actionsCreators.deleteSubCategory());

    try {
      const response = await deleteData(`/api/subCategories/${subCategoryId}`);
      dispatch(actionsCreators.deleteSubCategorySuccess(response));
      showToast(toast, response?.message?.[locale], "success");
    } catch (error) {
      dispatch(actionsCreators.deleteSubCategoryFail(error));
      showToast(toast, error?.response?.data?.message?.[locale], "error");
    }
  };
};
