import {
  SUBCATEGORIES_ACTIONS_TYPES,
  SUBCATEGORY_ACTIONS_TYPES,
} from "../../actions/actionTypes";

const initialState = {
  isLoading: false,
  error: null,
  subCategories: [],
  subCategory: {},
  message: "",
  total: 0,
};

const subCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBCATEGORIES_ACTIONS_TYPES.GET_SUBCATEGORIES:
      return { ...state, isLoading: true };
    case SUBCATEGORIES_ACTIONS_TYPES.GET_SUBCATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        subCategories: action.payLoad.subCategories,
        total: action.payLoad.total,
      };
    case SUBCATEGORIES_ACTIONS_TYPES.GET_SUBCATEGORIES_FAIL:
      return { ...state, isLoading: false, error: action.payLoad };
    // ======================================================
    case SUBCATEGORY_ACTIONS_TYPES.GET_SUBCATEGORY:
      return { ...state, isLoading: true };
    case SUBCATEGORY_ACTIONS_TYPES.GET_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        subCategory: action.payLoad,
      };
    case SUBCATEGORY_ACTIONS_TYPES.GET_SUBCATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };
    // ======================================================
    case SUBCATEGORY_ACTIONS_TYPES.POST_SUBCATEGORY:
      return { ...state, isLoading: true };
    case SUBCATEGORY_ACTIONS_TYPES.POST_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        subCategories: [
          ...state.subCategories,
          action.payLoad.data.subCategory,
        ],
        subCategory: {
          ...state.subCategory,
          ...action.payLoad.data.subCategory,
        },
        message: action.payLoad.message,
        error: null,
      };
    case SUBCATEGORY_ACTIONS_TYPES.POST_SUBCATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
        error: "error",
        message: action.payLoad,
      };
    // ======================================================

    case SUBCATEGORY_ACTIONS_TYPES.PUT_SUBCATEGORY:
      return { ...state, isLoading: true };
    case SUBCATEGORY_ACTIONS_TYPES.PUT_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        subCategories: [
          ...state.subCategories,
          action?.payLoad?.data?.subCategory,
        ],
        message: action?.payLoad?.message,
      };
    case SUBCATEGORY_ACTIONS_TYPES.PUT_SUBCATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
        error: "error",
      };
    // ======================================================

    case SUBCATEGORY_ACTIONS_TYPES.DELETE_SUBCATEGORY:
      return { ...state, isLoading: true };
    case SUBCATEGORY_ACTIONS_TYPES.DELETE_SUBCATEGORY_SUCCESS:
      const updatedSubCategories = state.subCategories.filter(
        (subCategory) =>
          subCategory?._id !== action?.payLoad?.data?.SubCategory?._id
      );
      return {
        ...state,
        isLoading: false,
        error: null,
        subCategories: updatedSubCategories,
        message: action?.payLoad?.message,
      };
    case SUBCATEGORY_ACTIONS_TYPES.DELETE_SUBCATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };
    default:
      return state;
  }
};

export { subCategoryReducer };
