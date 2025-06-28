import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { adminReducer } from "./reducers/adminReducer/adminReducer.js";
import { productReducer } from "./reducers/productReducer/productReducer.js";
import { sellerReducer } from "./reducers/sellerReducer/sellerReducer.js";
import { categoriesReducer } from "./reducers/categoriesReducer/categoriesReducer.js";
import { subCategoriesReducer } from "./reducers/subCategoriesReducer/subCategoriesReducer.js";
import { couponCodeReducer } from "./reducers/couponCodeRdeucer/couponCodeReducer.js";
import { localeReducer } from "./reducers/languageReducer/languageReducer.js";
import { thunk } from "redux-thunk";
import { statisticsReducer } from "./reducers/statisticsReducser/statisticsReducser.js";
import { userReducer } from "./reducers/userReducer/userReducer.js";
import { settingsReducer } from "./reducers/settingsReducer/settingsReducer.js";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
const appReducers = combineReducers({
  adminReducer,
  userReducer,
  productReducer,
  sellerReducer,
  categoriesReducer,
  subCategoriesReducer,
  couponCodeReducer,
  localeReducer,
  statisticsReducer,
  settingsReducer,
});
export const store = createStore(appReducers, enhancer);
