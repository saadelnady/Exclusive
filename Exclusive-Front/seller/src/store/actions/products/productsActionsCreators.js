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
} from "./actionTypes";

export const getProducts = (payLoad) => {
  return {
    type: GET_PRODUCTS,
    payLoad,
  };
};
export const getProductsSuccess = (payLoad) => {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payLoad,
  };
};
export const getProductsFail = (payLoad) => {
  return {
    type: GET_PRODUCTS_FAIL,
    payLoad,
  };
};

// ==================================================================================
export const getProduct = () => {
  return {
    type: GET_PRODUCT,
  };
};

export const getProductSuccess = (payLoad) => {
  return {
    type: GET_PRODUCT_SUCCESS,
    payLoad,
  };
};

export const getProductFail = (payLoad) => {
  return {
    type: GET_PRODUCT_FAIL,
    payLoad,
  };
};

// ========================================================================
export const addProduct = (payLoad) => {
  return {
    type: POST_PRODUCT,
    payLoad,
  };
};

export const addProductSuccess = (payLoad) => {
  return {
    type: POST_PRODUCT_SUCCESS,
    payLoad,
  };
};

export const addProductFail = (payLoad) => {
  return {
    type: POST_PRODUCT_FAIL,
    payLoad,
  };
};
// ========================================================================

export const editProduct = (payLoad) => {
  return {
    type: PUT_PRODUCT,
    payLoad,
  };
};
export const editProductSuccess = (payLoad) => {
  return {
    type: PUT_PRODUCT_SUCCESS,
    payLoad,
  };
};
export const editProductFail = (payLoad) => {
  return {
    type: PUT_PRODUCT_FAIL,
    payLoad,
  };
};

// ========================================================================
export const deleteProduct = (payLoad) => {
  return {
    type: DELETE_PRODUCT,
    payLoad,
  };
};
export const deleteProductSuccess = (payLoad) => {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    payLoad,
  };
};
export const deleteProductFail = (payLoad) => {
  return {
    type: DELETE_PRODUCT_FAIL,
    payLoad,
  };
};
