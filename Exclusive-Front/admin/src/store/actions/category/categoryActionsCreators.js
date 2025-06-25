import {
  CATEGORIES_ACTIONS_TYPES,
  CATEGORY_ACTIONS_TYPES,
} from "../actionTypes";

export const getCategories = (payLoad) => {
  return {
    type: CATEGORIES_ACTIONS_TYPES.GET_CATEGORIES,
    payLoad,
  };
};
export const getCategoriesSuccess = (payLoad) => {
  return {
    type: CATEGORIES_ACTIONS_TYPES.GET_CATEGORIES_SUCCESS,
    payLoad,
  };
};
export const getCategoriesFail = (payLoad) => {
  return {
    type: CATEGORIES_ACTIONS_TYPES.GET_CATEGORIES_FAIL,
    payLoad,
  };
};
// ==================================================================================

export const getCategory = (payLoad) => {
  return {
    type:   CATEGORY_ACTIONS_TYPES.GET_CATEGORY,
    payLoad,
  };
};
export const getCategorySuccess = (payLoad) => {
  return {
    type:  CATEGORY_ACTIONS_TYPES.GET_CATEGORY_SUCCESS,
    payLoad,
  };
};
export const getCategoryFail = (payLoad) => {
  return {
    type: CATEGORY_ACTIONS_TYPES.GET_CATEGORY_FAIL,
    payLoad,
  };
};

// ==================================================================================
export const addCategory = (payLoad) => {
  return {
    type: CATEGORY_ACTIONS_TYPES.POST_CATEGORY,
    payLoad,
  };
};
export const addCategorySuccess = (payLoad) => {
  return {
    type: CATEGORY_ACTIONS_TYPES.POST_CATEGORY_SUCCESS,
    payLoad,
  };
};
export const addCategoryFail = (payLoad) => {
  return {
    type: CATEGORY_ACTIONS_TYPES.POST_CATEGORY_FAIL,
    payLoad,
  };
};
// ==================================================================================

export const editCategory = (payLoad) => {
  return {
    type: CATEGORY_ACTIONS_TYPES.PUT_CATEGORY,
    payLoad,
  };
};
export const editCategorySuccess = (payLoad) => {
  return {
    type: CATEGORY_ACTIONS_TYPES.PUT_CATEGORY_SUCCESS,
    payLoad,
  };
};
export const editCategoryFail = (payLoad) => {
  return {
    type: CATEGORY_ACTIONS_TYPES.PUT_CATEGORY_FAIL,
    payLoad,
  };
};
// ==================================================================================

export const deleteCategory = () => {
  return {
    type: CATEGORY_ACTIONS_TYPES.DELETE_CATEGORY,
  };
};
export const deleteCategorySuccess = (payLoad) => {
  return {
    type: CATEGORY_ACTIONS_TYPES.DELETE_CATEGORY_SUCCESS,
    payLoad,
  };
};
export const deleteCategoryFail = (payLoad) => {
  return {
    type: CATEGORY_ACTIONS_TYPES.DELETE_CATEGORY_FAIL,
    payLoad,
  };
};
