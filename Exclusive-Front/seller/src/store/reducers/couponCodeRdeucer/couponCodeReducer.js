import {
  COUPONS_ACTIONS_TYPES,
  COUPON_CODE_ACTIONS_TYPES,
} from "../../actions/actionTypes";

const initialState = {
  isLoading: false,
  error: null,
  coupons: [],
  couponCode: {},
  message: "",
  total: 0,
};
const couponCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    // ======================================================

    case COUPON_CODE_ACTIONS_TYPES.POST_COUPON_CODE:
      return { ...state, isLoading: true };
    case COUPON_CODE_ACTIONS_TYPES.POST_COUPON_CODE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        couponCode: action.payLoad.data.couponCode,
        coupons: [...state.coupons, action.payLoad.data.couponCode],
        message: action.payLoad.message,
      };
    case COUPON_CODE_ACTIONS_TYPES.POST_COUPON_CODE_FAIL:
      return {
        ...state,
        isLoading: false,
        message: action.payLoad,
      };
    // ======================================================
    case COUPONS_ACTIONS_TYPES.GET_SELLER_COUPONS:
      return { ...state, isLoading: true };
    case COUPONS_ACTIONS_TYPES.GET_SELLER_COUPONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        coupons: action.payLoad.data.coupons,
      };
    case COUPONS_ACTIONS_TYPES.GET_SELLER_COUPONS_FAIL:
      return { ...state, isLoading: false, message: action.payLoad };
    default:
      return state;
  }
};
export { couponCodeReducer };
