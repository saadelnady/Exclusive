import { deleteData, getData, postData, putData } from "../../../API/API";
import { showToast } from "../../../helpers/toast_helper";
import * as actionsCreators from "./categoriesActionsCreators";
// =========================================================================================

export const fetchCategories = ({ limit = "", page = "", text = "" } = {}) => {
  return async (dispatch) => {
    dispatch(actionsCreators.getCategories());
    try {
      let response = "";
      if (text) {
        response = await getData(
          `/api/categories?limit=${limit}&page=${page}&text=${text}`
        );
      } else {
        response = await getData(`/api/categories?limit=${limit}&page=${page}`);
      }

      dispatch(actionsCreators.getCategoriesSuccess(response.data));
    } catch (error) {
      dispatch(actionsCreators.getCategoriesFail(error));
    }
  };
};
// =========================================================================================

export const fetchCategory = ({ categoryId }) => {
  return async (dispatch) => {
    dispatch(actionsCreators.getCategory());
    try {
      const response = await getData(`/api/categories/${categoryId}`);
      dispatch(actionsCreators.getCategorySuccess(response?.data?.category));
    } catch (error) {
      dispatch(actionsCreators.getCategoriesFail(error));
    }
  };
};
// =========================================================================================

export const addCategory = ({ data, toast, locale, navigate }) => {
  return async (dispatch) => {
    dispatch(actionsCreators.addCategory(data));
    try {
      const response = await postData(`/api/categories`, data);
      dispatch(actionsCreators.addCategorySuccess(response));
      showToast(toast, response?.message?.[locale], "success");
      navigate("/categories");
    } catch (error) {
      dispatch(
        actionsCreators.addCategoryFail(
          error?.response?.data?.message?.[locale]
        )
      );
      showToast(toast, error?.response?.data?.message?.[locale], "error");
    }
  };
};
// =========================================================================================

export const editCategory = ({ categoryId, data, toast, locale, navigate }) => {
  return async (dispatch) => {
    dispatch(actionsCreators.editCategory(data));

    try {
      const response = await putData(`/api/categories/${categoryId}`, data);
      dispatch(actionsCreators.editCategorySuccess(response));
      showToast(toast, response?.message?.[locale], "success");
      navigate("/categories");
    } catch (error) {
      dispatch(
        actionsCreators.editCategoryFail(
          error?.response?.data?.message?.[locale]
        )
      );
      showToast(toast, error?.response?.data?.message?.[locale], "error");
    }
  };
};
// =========================================================================================

export const deleteCategory = ({ categoryId, toast }) => {
  return async (dispatch) => {
    dispatch(actionsCreators.deleteCategory());

    try {
      const response = await deleteData(`/api/categories/${categoryId}`);
      dispatch(actionsCreators.deleteCategorySuccess(response));
      showToast(toast, response?.message, "success");
    } catch (error) {
      dispatch(actionsCreators.deleteCategoryFail(error));
      showToast(toast, error?.response?.data?.message, "error");
    }
  };
};
