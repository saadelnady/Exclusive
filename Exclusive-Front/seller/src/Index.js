// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { store } from "./store/index.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";

const router = createBrowserRouter(
  [
    {
      path: "/*",
      element: <App />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
import ar from "@/languages/ar.json";
import en from "@/languages/en.json";

const locale = "ar";
const messages = { ar, en };
root.render(
  <Provider store={store}>
    <IntlProvider
      locale={locale}
      messages={messages[locale]}
      defaultLocale="ar"
    >
      <RouterProvider router={router} />
    </IntlProvider>
  </Provider>
);
