import {
  DELETE_CATEGORY,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_SUCCESS,
  GET_CATEGORIES,
  GET_CATEGORIES_FAIL,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORY,
  GET_CATEGORY_FAIL,
  GET_CATEGORY_SUCCESS,
  POST_CATEGORY,
  POST_CATEGORY_FAIL,
  POST_CATEGORY_SUCCESS,
  PUT_CATEGORY,
  PUT_CATEGORY_FAIL,
  PUT_CATEGORY_SUCCESS,
} from "./actionTypes";

export const getCategories = (payLoad) => {
  return {
    type: GET_CATEGORIES,
    payLoad,
  };
};
export const getCategoriesSuccess = (payLoad) => {
  return {
    type: GET_CATEGORIES_SUCCESS,
    payLoad,
  };
};
export const getCategoriesFail = (payLoad) => {
  return {
    type: GET_CATEGORIES_FAIL,
    payLoad,
  };
};
// ==================================================================================

export const getCategory = (payLoad) => {
  return {
    type: GET_CATEGORY,
    payLoad,
  };
};
export const getCategorySuccess = (payLoad) => {
  return {
    type: GET_CATEGORY_SUCCESS,
    payLoad,
  };
};
export const getCategoryFail = (payLoad) => {
  return {
    type: GET_CATEGORY_FAIL,
    payLoad,
  };
};

// ==================================================================================
export const addCategory = (payLoad) => {
  return {
    type: POST_CATEGORY,
    payLoad,
  };
};
export const addCategorySuccess = (payLoad) => {
  return {
    type: POST_CATEGORY_SUCCESS,
    payLoad,
  };
};
export const addCategoryFail = (payLoad) => {
  return {
    type: POST_CATEGORY_FAIL,
    payLoad,
  };
};
// ==================================================================================

export const editCategory = (payLoad) => {
  return {
    type: PUT_CATEGORY,
    payLoad,
  };
};
export const editCategorySuccess = (payLoad) => {
  return {
    type: PUT_CATEGORY_SUCCESS,
    payLoad,
  };
};
export const editCategoryFail = (payLoad) => {
  return {
    type: PUT_CATEGORY_FAIL,
    payLoad,
  };
};
// ==================================================================================

export const deleteCategory = () => {
  return {
    type: DELETE_CATEGORY,
  };
};
export const deleteCategorySuccess = (payLoad) => {
  return {
    type: DELETE_CATEGORY_SUCCESS,
    payLoad,
  };
};
export const deleteCategoryFail = (payLoad) => {
  return {
    type: DELETE_CATEGORY_FAIL,
    payLoad,
  };
};
