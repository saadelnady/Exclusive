import {
  DELETE_SUB_CATEGORY,
  DELETE_SUB_CATEGORY_FAIL,
  DELETE_SUB_CATEGORY_SUCCESS,
  GET_SUB_CATEGORIES,
  GET_SUB_CATEGORIES_FAIL,
  GET_SUB_CATEGORIES_SUCCESS,
  GET_SUB_CATEGORY,
  GET_SUB_CATEGORY_FAIL,
  GET_SUB_CATEGORY_SUCCESS,
  POST_SUB_CATEGORY,
  POST_SUB_CATEGORY_FAIL,
  POST_SUB_CATEGORY_SUCCESS,
  PUT_SUB_CATEGORY,
  PUT_SUB_CATEGORY_FAIL,
  PUT_SUB_CATEGORY_SUCCESS,
} from "./actionTypes";

export const getSubCategories = (payLoad) => {
  return {
    type: GET_SUB_CATEGORIES,
    payLoad,
  };
};
export const getSubCategoriesSuccess = (payLoad) => {
  return {
    type: GET_SUB_CATEGORIES_SUCCESS,
    payLoad,
  };
};
export const getSubCategoriesFail = (payLoad) => {
  return {
    type: GET_SUB_CATEGORIES_FAIL,
    payLoad,
  };
};
// ========================================================================

export const getSubCategory = (payLoad) => {
  return {
    type: GET_SUB_CATEGORY,
    payLoad,
  };
};
export const getSubCategorySuccess = (payLoad) => {
  return {
    type: GET_SUB_CATEGORY_SUCCESS,
    payLoad,
  };
};
export const getSubCategoryFail = (payLoad) => {
  return {
    type: GET_SUB_CATEGORY_FAIL,
    payLoad,
  };
};
// ========================================================================
export const addSubCategory = (payLoad) => {
  return {
    type: POST_SUB_CATEGORY,
    payLoad,
  };
};
export const addSubCategorySuccess = (payLoad) => {
  return {
    type: POST_SUB_CATEGORY_SUCCESS,
    payLoad,
  };
};
export const addSubCategoryFail = (payLoad) => {
  return {
    type: POST_SUB_CATEGORY_FAIL,
    payLoad,
  };
};
// ========================================================================

export const editSubCategory = (payLoad) => {
  return {
    type: PUT_SUB_CATEGORY,
    payLoad,
  };
};
export const editSubCategorySuccess = (payLoad) => {
  return {
    type: PUT_SUB_CATEGORY_SUCCESS,
    payLoad,
  };
};
export const editSubCategoryFail = (payLoad) => {
  return {
    type: PUT_SUB_CATEGORY_FAIL,
    payLoad,
  };
};
// ========================================================================
export const deleteSubCategory = (payLoad) => {
  return {
    type: DELETE_SUB_CATEGORY,
    payLoad,
  };
};
export const deleteSubCategorySuccess = (payLoad) => {
  return {
    type: DELETE_SUB_CATEGORY_SUCCESS,
    payLoad,
  };
};
export const deleteSubCategoryFail = (payLoad) => {
  return {
    type: DELETE_SUB_CATEGORY_FAIL,
    payLoad,
  };
};
