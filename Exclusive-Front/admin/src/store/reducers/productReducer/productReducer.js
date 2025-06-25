import { PRODUCT_ACTIONS_TYPES } from "../../actions/actionTypes";
import { PRODUCTS_ACTIONS_TYPES } from "../../actions/actionTypes";

const initialState = {
  isLoading: false,
  product: {},
  products: [],
  flashSalesProducts: [],
  bestSellingProducts: [],
  newArrivalProducts: [],
  searchedProducts: [],
  error: null,
  message: "",
  total: 0,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_ACTIONS_TYPES.GET_PRODUCTS:
      return { ...state, isLoading: true };

    case PRODUCTS_ACTIONS_TYPES.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.payLoad.products,
        total: action.payLoad.total,
        error: null,
      };

    case PRODUCTS_ACTIONS_TYPES.GET_PRODUCTS_FAIL:
      return { ...state, isLoading: false, error: action.payLoad };

    // ========================================================================
    case PRODUCTS_ACTIONS_TYPES.GET_SEARCHED_PRODUCTS:
      return { ...state };

    case PRODUCTS_ACTIONS_TYPES.GET_SEARCHED_PRODUCTS_SUCCESS:
      return {
        ...state,

        searchedProducts: action.payLoad.products,
        total: action.payLoad.total,
        error: null,
      };

    case PRODUCTS_ACTIONS_TYPES.GET_SEARCHED_PRODUCTS_FAIL:
      return { ...state, isLoading: false, error: action.payLoad };

    // ========================================================================
    case PRODUCTS_ACTIONS_TYPES.GET_FLASH_SALES_PRODUCTS:
      return { ...state, isLoading: true };

    case PRODUCTS_ACTIONS_TYPES.GET_FLASH_SALES_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        flashSalesProducts: action.payLoad.data.products,
        total: action.payLoad.data.total,
        error: null,
      };

    case PRODUCTS_ACTIONS_TYPES.GET_FLASH_SALES_PRODUCTS_FAIL:
      return { ...state, isLoading: false, error: action.payLoad };

    // ========================================================================
    case PRODUCTS_ACTIONS_TYPES.GET_ACCEPTED_SELLER_PRODUCTS:
      return { ...state, isLoading: true };

    case PRODUCTS_ACTIONS_TYPES.GET_ACCEPTED_SELLER_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.payLoad.data.products,
        total: action.payLoad.data.total,
        error: null,
      };

    case PRODUCTS_ACTIONS_TYPES.GET_ACCEPTED_SELLER_PRODUCTS_FAIL:
      return { ...state, isLoading: false, error: action.payLoad };
    // ========================================================================

    case PRODUCTS_ACTIONS_TYPES.GET_SELLER_PRODUCTS:
      return { ...state, isLoading: true };

    case PRODUCTS_ACTIONS_TYPES.GET_SELLER_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.payLoad.data.products,
        total: action.payLoad.data.total,
        error: null,
      };

    case PRODUCTS_ACTIONS_TYPES.GET_SELLER_PRODUCTS_FAIL:
      return { ...state, isLoading: false, error: action.payLoad };

    // ========================================================================
    case PRODUCT_ACTIONS_TYPES.GET_PRODUCT:
      return { ...state, isLoading: true };

    case PRODUCT_ACTIONS_TYPES.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payLoad,
        isLoading: false,
        error: null,
      };

    case PRODUCT_ACTIONS_TYPES.GET_PRODUCT_FAIL:
      return { ...state, isLoading: false, error: action.payLoad };

    // ========================================================================
    case PRODUCT_ACTIONS_TYPES.POST_PRODUCT:
      return { ...state, isLoading: true };

    case PRODUCT_ACTIONS_TYPES.POST_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: [...state.products, action.payLoad.data.product],
        message: action.payLoad.message,
      };

    case PRODUCT_ACTIONS_TYPES.POST_PRODUCT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: "error",
        message: action.payLoad,
      };
    // ========================================================================
    case PRODUCT_ACTIONS_TYPES.PUT_PRODUCT:
      return { ...state, isLoading: true };

    case PRODUCT_ACTIONS_TYPES.PUT_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: [...state.products, action?.payLoad?.data?.product],
        product: { ...state.product, ...action?.payLoad?.data?.product },
        error: null,
      };

    case PRODUCT_ACTIONS_TYPES.PUT_PRODUCT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: "error",
        message: action.payLoad,
      };
    // ========================================================================
    case PRODUCT_ACTIONS_TYPES.DELETE_PRODUCT:
      return { ...state, isLoading: true, error: null };

    case PRODUCT_ACTIONS_TYPES.DELETE_PRODUCT_SUCCESS:
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

    case PRODUCT_ACTIONS_TYPES?.DELETE_PRODUCT_FAIL:
      return { ...state, isLoading: false, error: action?.payLoad };

    // ========================================================================
    case PRODUCT_ACTIONS_TYPES.PUT_ACCEPT_PRODUCT: {
      return { ...state, isLoading: true, error: null };
    }
    case PRODUCT_ACTIONS_TYPES.PUT_ACCEPT_PRODUCT_SUCCESS: {
      const updatedProducts = state.products.filter(
        (product) => product._id !== action?.payLoad?.data?.product?._id
      );
      return {
        ...state,
        isLoading: false,
        error: null,
        products: [...updatedProducts],
        product: { ...action?.payLoad?.data?.product },
        message: action?.payLoad?.message,
      };
    }
    case PRODUCT_ACTIONS_TYPES.PUT_ACCEPT_PRODUCT_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action?.payLoad,
      };
    }

    // ========================================================================
    case PRODUCT_ACTIONS_TYPES.PUT_UNBLOCK_PRODUCT: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case PRODUCT_ACTIONS_TYPES.PUT_UNBLOCK_PRODUCT_SUCCESS: {
      const updatedProducts = state.products.filter(
        (product) => product._id !== action?.payLoad?.data?.product?._id
      );
      return {
        ...state,
        isLoading: false,
        products: [...updatedProducts],
        product: { ...action?.payLoad?.data?.product },
        message: action?.payLoad?.data?.message,
        error: null,
      };
    }
    case PRODUCT_ACTIONS_TYPES.PUT_UNBLOCK_PRODUCT_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action?.payLoad,
      };
    }

    // ========================================================================
    case PRODUCT_ACTIONS_TYPES.PUT_BLOCK_PRODUCT: {
      return { ...state, isLoading: true, error: null };
    }
    case PRODUCT_ACTIONS_TYPES.PUT_BLOCK_PRODUCT_SUCCESS: {
      const updatedProducts = state.products.filter(
        (product) => product._id !== action?.payLoad?.data?.product?._id
      );
      return {
        ...state,
        isLoading: false,
        error: null,
        products: [...updatedProducts],
        product: { ...action?.payLoad?.data?.product },
        message: action?.payLoad?.message,
      };
    }
    case PRODUCT_ACTIONS_TYPES.PUT_BLOCK_PRODUCT_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action?.payLoad,
      };
    }
    // ========================================================================
    case PRODUCT_ACTIONS_TYPES.CLEAR_PRODUCT:
      return { ...state, product: {} };

    // ========================================================================

    default:
      return state;
  }
};

export { productReducer };
