import { deleteData, getData, postData, putData } from "../../../API/API";
import { showToast } from "../../../helpers/toast_helper";
import * as actionsCreators from "./categoriesActionsCreators";
// =========================================================================================

export const fetchCategories = ({
  limit = "",
  page = "",
  text = "",
  append = false,
} = {}) => {
  return async (dispatch) => {
    dispatch(actionsCreators.getCategories());
    try {
      const params = new URLSearchParams();
      if (text) params.append("text", text);
      if (limit) params.append("limit", limit);
      if (page) params.append("page", page);

      const response = await getData(`/api/categories?${params.toString()}`);

      dispatch(
        actionsCreators.getCategoriesSuccess({
          ...response.data,
          append, // ✅ أرسله للـ reducer
        })
      );
    } catch (error) {
      console.log(error);
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

export const deleteCategory = ({ categoryId, toast, locale }) => {
  return async (dispatch) => {
    dispatch(actionsCreators.deleteCategory());

    try {
      const response = await deleteData(`/api/categories/${categoryId}`);
      dispatch(actionsCreators.deleteCategorySuccess(response));
      showToast(toast, response?.message?.[locale], "success");
    } catch (error) {
      dispatch(actionsCreators.deleteCategoryFail(error));
      showToast(toast, error?.response?.data?.message, "error");
    }
  };
};
