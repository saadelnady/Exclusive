import { setCookie } from "nookies";
import { SET_LOCALE } from "../actionTypes";

export const setLocale = (locale) => {
  return (dispatch) => {
    setCookie(null, "locale", locale, {
      maxAge: 365 * 24 * 60 * 60,
      path: "/",
    });

    dispatch({
      type: SET_LOCALE,
      payload: locale,
    });
  };
};
