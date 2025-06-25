import { SET_LOCALE } from "@/store/actions/actionTypes";
import { parseCookies } from "nookies";

const cookies = parseCookies();
const initialLocale = cookies.locale || "ar";

const initialState = {
  locale: initialLocale,
};

const localeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCALE:
      return {
        ...state,
        locale: action.payload,
      };
    default:
      return state;
  }
};

export { localeReducer };
