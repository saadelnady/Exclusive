import { PRODUCT_ACTIONS_TYPES, PRODUCTS_ACTIONS_TYPES } from "../actionTypes";

export const getProducts = (payLoad) => {
  return {
    type: PRODUCTS_ACTIONS_TYPES.GET_PRODUCTS,
    payLoad,
  };
};
export const getProductsSuccess = (payLoad) => {
  return {
    type: PRODUCTS_ACTIONS_TYPES.GET_PRODUCTS_SUCCESS,
    payLoad,
  };
};
export const getProductsFail = (payLoad) => {
  return {
    type: PRODUCTS_ACTIONS_TYPES.GET_PRODUCTS_FAIL,
    payLoad,
  };
};

// ==================================================================================
export const getSearchedProducts = (payLoad) => {
  return {
    type: PRODUCTS_ACTIONS_TYPES.GET_SEARCHED_PRODUCTS,
    payLoad,
  };
};
export const getSearchedProductsSuccess = (payLoad) => {
  return {
    type: PRODUCTS_ACTIONS_TYPES.GET_SEARCHED_PRODUCTS_SUCCESS,
    payLoad,
  };
};
export const getSearchedProductsFail = (payLoad) => {
  return {
    type: PRODUCTS_ACTIONS_TYPES.GET_SEARCHED_PRODUCTS_FAIL,
    payLoad,
  };
};

// ==================================================================================
export const getSellerProducts = (payLoad) => {
  return {
    type: PRODUCTS_ACTIONS_TYPES.GET_SELLER_PRODUCTS,
    payLoad,
  };
};
export const getSellerProductsSuccess = (payLoad) => {
  return {
    type: PRODUCTS_ACTIONS_TYPES.GET_SELLER_PRODUCTS_SUCCESS,
    payLoad,
  };
};
export const getSellerProductsFail = (payLoad) => {
  return {
    type: PRODUCTS_ACTIONS_TYPES.GET_SELLER_PRODUCTS_FAIL,
    payLoad,
  };
};

// ==================================================================================
export const getProduct = () => {
  return {
    type: PRODUCT_ACTIONS_TYPES.GET_PRODUCT,
  };
};

export const getProductSuccess = (payLoad) => {
  return {
    type: PRODUCT_ACTIONS_TYPES.GET_PRODUCT_SUCCESS,
    payLoad,
  };
};

export const getProductFail = (payLoad) => {
  return {
    type: PRODUCT_ACTIONS_TYPES.GET_PRODUCT_FAIL,
    payLoad,
  };
};
// ==================================================================================
export const clearProduct = (payLoad) => {
  return {
    type: PRODUCT_ACTIONS_TYPES.CLEAR_PRODUCT,
    payLoad,
  };
};

// ==================================================================================
export const getAcceptedSellerProducts = () => {
  return {
    type: PRODUCTS_ACTIONS_TYPES.GET_ACCEPTED_SELLER_PRODUCTS,
  };
};

export const getAcceptedSellerProductsSuccess = (payLoad) => {
  return {
    type: PRODUCTS_ACTIONS_TYPES.GET_ACCEPTED_SELLER_PRODUCTS_SUCCESS,
    payLoad,
  };
};

export const getAcceptedSellerProductsFail = (payLoad) => {
  return {
    type: PRODUCTS_ACTIONS_TYPES.GET_ACCEPTED_SELLER_PRODUCTS_FAIL,
    payLoad,
  };
};
// ========================================================================
export const addProduct = (payLoad) => {
  return {
    type: PRODUCT_ACTIONS_TYPES.POST_PRODUCT,
    payLoad,
  };
};

export const addProductSuccess = (payLoad) => {
  return {
    type: PRODUCT_ACTIONS_TYPES.POST_PRODUCT_SUCCESS,
    payLoad,
  };
};

export const addProductFail = (payLoad) => {
  return {
    type: PRODUCT_ACTIONS_TYPES.POST_PRODUCT_FAIL,
    payLoad,
  };
};
// ========================================================================

export const editProduct = (payLoad) => {
  return {
    type: PRODUCT_ACTIONS_TYPES.PUT_PRODUCT,
    payLoad,
  };
};
export const editProductSuccess = (payLoad) => {
  return {
    type: PRODUCT_ACTIONS_TYPES.PUT_PRODUCT_SUCCESS,
    payLoad,
  };
};
export const editProductFail = (payLoad) => {
  return {
    type: PRODUCT_ACTIONS_TYPES.PUT_PRODUCT_FAIL,
    payLoad,
  };
};
// ========================================================================
export const acceptProduct = (payLoad) => {
  return {
    type: PRODUCT_ACTIONS_TYPES.PUT_ACCEPT_PRODUCT,
    payLoad,
  };
};
export const acceptProductSuccess = (payLoad) => {
  return {
    type: PRODUCT_ACTIONS_TYPES.PUT_ACCEPT_PRODUCT_SUCCESS,
    payLoad,
  };
};
export const acceptProductFail = (payLoad) => {
  return {
    type: PRODUCT_ACTIONS_TYPES.PUT_ACCEPT_PRODUCT_FAIL,
    payLoad,
  };
};
// ========================================================================
export const blockProduct = (payLoad) => {
  return {
    type: PRODUCT_ACTIONS_TYPES.PUT_BLOCK_PRODUCT,
    payLoad,
  };
};
export const blockProductSuccess = (payLoad) => {
  return {
    type: PRODUCT_ACTIONS_TYPES.PUT_BLOCK_PRODUCT_SUCCESS,
    payLoad,
  };
};
export const blockProductFail = (payLoad) => {
  return {
    type: PRODUCT_ACTIONS_TYPES.PUT_BLOCK_PRODUCT_FAIL,
    payLoad,
  };
};
// ========================================================================
export const unBlockProduct = (payLoad) => {
  return {
    type: PRODUCT_ACTIONS_TYPES.PUT_UNBLOCK_PRODUCT,
    payLoad,
  };
};
export const unBlockProductSuccess = (payLoad) => {
  return {
    type: PRODUCT_ACTIONS_TYPES.PUT_UNBLOCK_PRODUCT_SUCCESS,
    payLoad,
  };
};
export const unBlockProductFail = (payLoad) => {
  return {
    type: PRODUCT_ACTIONS_TYPES.PUT_UNBLOCK_PRODUCT_FAIL,
    payLoad,
  };
};

// ========================================================================
export const deleteProduct = (payLoad) => {
  return {
    type: PRODUCT_ACTIONS_TYPES.DELETE_PRODUCT,
    payLoad,
  };
};
export const deleteProductSuccess = (payLoad) => {
  return {
    type: PRODUCT_ACTIONS_TYPES.DELETE_PRODUCT_SUCCESS,
    payLoad,
  };
};
export const deleteProductFail = (payLoad) => {
  return {
    type: PRODUCT_ACTIONS_TYPES.DELETE_PRODUCT_FAIL,
    payLoad,
  };
};

// ========================================================================
export const getFlashSalesProducts = (payLoad) => {
  return {
    type: PRODUCTS_ACTIONS_TYPES.GET_FLASH_SALES_PRODUCTS,
    payLoad,
  };
};
export const getFlashSalesProductsSuccess = (payLoad) => {
  return {
    type: PRODUCTS_ACTIONS_TYPES.GET_FLASH_SALES_PRODUCTS_SUCCESS,
    payLoad,
  };
};
export const getFlashSalesProductsFail = (payLoad) => {
  return {
    type: PRODUCTS_ACTIONS_TYPES.GET_FLASH_SALES_PRODUCTS_FAIL,
    payLoad,
  };
};
