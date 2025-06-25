import { Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "react-toastify/dist/ReactToastify.css";
import "./styles/app.scss";
import { ToastContainer } from "react-toastify";
import Admin from "./layout";

import Login from "./components/login";

import { IntlProvider, useIntl } from "react-intl";
import ar from "@/languages/ar.json";
import en from "@/languages/en.json";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import GuestRoute from "./layout/GuestRoute";
import ProtectedRoute from "./layout/ProtectedRoute";

const languages = {
  ar,
  en,
};

function App() {
  const { locale } = useSelector((state) => state.localeReducer);
  const messages = languages[locale];

  useEffect(() => {
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
  }, [locale]);
  return (
    <IntlProvider messages={messages} defaultLocale="ar" locale={locale}>
      <div className="app">
        <Routes>
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />

          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </IntlProvider>
  );
}

export default App;
