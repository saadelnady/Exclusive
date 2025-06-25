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
} from "@/store/actions/subCategories/actionTypes";

const initialState = {
  isLoading: false,
  error: null,
  subCategories: [],
  subCategory: {},
  message: "",
  total: 0,
  currentPage: 1,
  pageSize: 10,
  totalPages: 0,
};

const subCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUB_CATEGORIES:
      return { ...state, isLoading: true };
    case GET_SUB_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        subCategories: action.payLoad.subCategories,
        total: action.payLoad.total,
        currentPage: action.payLoad.currentPage,
        pageSize: action.payLoad.pageSize,
        totalPages: action.payLoad.totalPages,
      };
    case GET_SUB_CATEGORIES_FAIL:
      return { ...state, isLoading: false, error: action.payLoad };
    // ======================================================
    case GET_SUB_CATEGORY:
      return { ...state, isLoading: true };
    case GET_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        subCategory: action.payLoad,
      };
    case GET_SUB_CATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };
    // ======================================================
    case POST_SUB_CATEGORY:
      return { ...state, isLoading: true };
    case POST_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        subCategories: [
          ...state.subCategories,
          action.payLoad.data.subCategory,
        ],

        message: action.payLoad.message,
        error: null,
      };
    case POST_SUB_CATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
        error: "error",
        message: action.payLoad,
      };
    // ======================================================

    case PUT_SUB_CATEGORY:
      return { ...state, isLoading: true };
    case PUT_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        subCategories: [
          ...state.subCategories,
          action?.payLoad?.data?.subCategory,
        ],
        message: action?.payLoad?.message,
      };
    case PUT_SUB_CATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
        error: "error",
      };
    // ======================================================

    case DELETE_SUB_CATEGORY:
      return { ...state, isLoading: true };
    case DELETE_SUB_CATEGORY_SUCCESS:
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
    case DELETE_SUB_CATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };
    default:
      return state;
  }
};

export { subCategoriesReducer };
