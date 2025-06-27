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
} from "@/store/actions/categories/actionTypes";

const initialState = {
  isLoading: false,
  error: null,
  categories: [],
  category: {},
  message: "",
  total: 0,
  currentPage: 1,
  pageSize: 10,
  totalPages: 0,
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, isLoading: true };

    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: action.payLoad.append
          ? [...state.categories, ...action.payLoad.categories]
          : action.payLoad.categories,
        total: action.payLoad.total,
        currentPage: action.payLoad.currentPage,
        pageSize: action.payLoad.pageSize,
        totalPages: action.payLoad.totalPages,
      };

    case GET_CATEGORIES_FAIL:
      return { ...state, error: action.payLoad };

    // ==================================================

    case GET_CATEGORY:
      return { ...state, isLoading: true };

    case GET_CATEGORY_SUCCESS:
      return { ...state, isLoading: false, category: action.payLoad };

    case GET_CATEGORY_FAIL:
      return { ...state, error: action.payLoad };

    // ==================================================

    case POST_CATEGORY:
      return { ...state, isLoading: true };

    case POST_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        categories: [...state.categories, action.payLoad.data.category],
        category: {},
        message: action.payLoad.message,
      };

    case POST_CATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
        error: "error",
        message: action.payLoad,
      };

    // ==================================================

    case PUT_CATEGORY:
      return { ...state, isLoading: true };

    case PUT_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: [],
        category: {},
        message: action?.payLoad?.message,
      };

    case PUT_CATEGORY_FAIL:
      return { ...state, isLoading: false, error: "error" };

    // ==================================================

    case DELETE_CATEGORY:
      return { ...state, isLoading: true, error: null };

    case DELETE_CATEGORY_SUCCESS:
      const updatedCategories = state.categories.filter(
        (category) => category?._id !== action?.payLoad?.data?.category?._id
      );
      return {
        ...state,
        isLoading: false,
        error: null,
        categories: [...updatedCategories],
        message: action?.payLoad?.message,
      };

    case DELETE_CATEGORY_FAIL:
      return { ...state, isLoading: false, error: action.payLoad };

    default:
      return state;
  }
};
export { categoriesReducer };
