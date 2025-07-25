import {
  DELETE_PRODUCT,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  GET_PRODUCT,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCTS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_SUCCESS,
  POST_PRODUCT,
  POST_PRODUCT_FAIL,
  POST_PRODUCT_SUCCESS,
  PUT_PRODUCT,
  PUT_PRODUCT_FAIL,
  PUT_PRODUCT_SUCCESS,
} from "@/store/actions/products/actionTypes";

const initialState = {
  isLoading: false,
  product: {},
  products: [],
  error: null,
  message: "",
  total: 0,
  currentPage: 1,
  pageSize: 10,
  totalPages: 0,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, isLoading: true };

    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.payLoad.products,
        total: action.payLoad.total,
        error: null,
      };

    case GET_PRODUCTS_FAIL:
      return { ...state, isLoading: false, error: action.payLoad };

    // ========================================================================
    case GET_PRODUCT:
      return { ...state, isLoading: true };

    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payLoad,
        isLoading: false,
        error: null,
      };

    case GET_PRODUCT_FAIL:
      return { ...state, isLoading: false, error: action.payLoad };

    // ========================================================================
    case POST_PRODUCT:
      return { ...state, isLoading: true };

    case POST_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: [...state.products, action.payLoad.data.product],
        message: action.payLoad.message,
      };

    case POST_PRODUCT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: "error",
        message: action.payLoad,
      };
    // ========================================================================
    case PUT_PRODUCT:
      return { ...state, isLoading: true };

    case PUT_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: [...state.products, action?.payLoad?.data?.product],
        product: { ...state.product, ...action?.payLoad?.data?.product },
        error: null,
      };

    case PUT_PRODUCT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: "error",
        message: action.payLoad,
      };
    // ========================================================================
    case DELETE_PRODUCT:
      return { ...state, isLoading: true, error: null };

    case DELETE_PRODUCT_SUCCESS:
      const updatedProducts = state.products.filter(
        (product) => product._id !== action?.payLoad?.data?.product?._id
      );
      return {
        ...state,
        isLoading: false,
        error: null,
        products: [...updatedProducts],
        message: action?.payLoad?.message,
      };

    case DELETE_PRODUCT_FAIL:
      return { ...state, isLoading: false, error: action?.payLoad };

    // ========================================================================

    default:
      return state;
  }
};

export { productReducer };
