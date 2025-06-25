import {
  SUBCATEGORIES_ACTIONS_TYPES,
  SUBCATEGORY_ACTIONS_TYPES,
} from "../actionTypes";
// ========================================================================

export const getSubCategories = (payLoad) => {
  return {
    type: SUBCATEGORIES_ACTIONS_TYPES.GET_SUBCATEGORIES,
  };
};
export const getSubCategoriesSuccess = (payLoad) => {
  return {
    type: SUBCATEGORIES_ACTIONS_TYPES.GET_SUBCATEGORIES_SUCCESS,
    payLoad,
  };
};
export const getSubCategoriesFail = (payLoad) => {
  return {
    type: SUBCATEGORIES_ACTIONS_TYPES.GET_SUBCATEGORIES_FAIL,
    payLoad,
  };
};
// ========================================================================

export const getSubCategory = (payLoad) => {
  return {
    type: SUBCATEGORY_ACTIONS_TYPES.GET_SUBCATEGORY,
    payLoad,
  };
};
export const getSubCategorySuccess = (payLoad) => {
  return {
    type: SUBCATEGORY_ACTIONS_TYPES.GET_SUBCATEGORY_SUCCESS,
    payLoad,
  };
};
export const getSubCategoryFail = (payLoad) => {
  return {
    type: SUBCATEGORY_ACTIONS_TYPES.GET_SUBCATEGORY_FAIL,
    payLoad,
  };
};
// ========================================================================
export const addSubCategory = (payLoad) => {
  return {
    type: SUBCATEGORY_ACTIONS_TYPES.POST_SUBCATEGORY,
    payLoad,
  };
};
export const addSubCategorySuccess = (payLoad) => {
  return {
    type: SUBCATEGORY_ACTIONS_TYPES.POST_SUBCATEGORY_SUCCESS,
    payLoad,
  };
};
export const addSubCategoryFail = (payLoad) => {
  return {
    type: SUBCATEGORY_ACTIONS_TYPES.POST_SUBCATEGORY_FAIL,
    payLoad,
  };
};
// ========================================================================

export const editSubCategory = (payLoad) => {
  return {
    type: SUBCATEGORY_ACTIONS_TYPES.PUT_SUBCATEGORY,
    payLoad,
  };
};
export const editSubCategorySuccess = (payLoad) => {
  return {
    type: SUBCATEGORY_ACTIONS_TYPES.PUT_SUBCATEGORY_SUCCESS,
    payLoad,
  };
};
export const editSubCategoryFail = (payLoad) => {
  return {
    type: SUBCATEGORY_ACTIONS_TYPES.PUT_SUBCATEGORY_FAIL,
    payLoad,
  };
};
// ========================================================================
export const deleteSubCategory = (payLoad) => {
  return {
    type: SUBCATEGORY_ACTIONS_TYPES.DELETE_SUBCATEGORY,
    payLoad,
  };
};
export const deleteSubCategorySuccess = (payLoad) => {
  return {
    type: SUBCATEGORY_ACTIONS_TYPES.DELETE_SUBCATEGORY_SUCCESS,
    payLoad,
  };
};
export const deleteSubCategoryFail = (payLoad) => {
  return {
    type: SUBCATEGORY_ACTIONS_TYPES.DELETE_SUBCATEGORY_FAIL,
    payLoad,
  };
};
