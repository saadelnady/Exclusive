import { Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";

import "./styles/app.scss";
import { ToastContainer } from "react-toastify";
import Seller from "./layout";

import Login from "./components/login";
import Register from "./components/Register";
import Otp from "./components/Otp";

import { IntlProvider } from "react-intl";
import ar from "@/languages/ar.json";
import en from "@/languages/en.json";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import GuestRoute from "./layout/GuestRoute";
import ProtectedRoute from "./layout/ProtectedRoute";
import { fetchSettings } from "./store/actions/settings/settingsActions";
import { toast } from "react-toastify";
import CompleteProfile from "./components/CompleteProfile/Index";
import { sellerStatus } from "./helpers/roles";
import PendingApproval from "./components/PendingApproval/Index";
import BlockedAccount from "./components/BlockedAccount/Index.js";

const languages = {
  ar,
  en,
};

function App() {
  const { locale } = useSelector((state) => state.localeReducer);
  const messages = languages[locale];
  const { settings } = useSelector((state) => state.settingsReducer);
  const { seller } = useSelector((state) => state.sellerReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    dispatch(fetchSettings({ locale, toast }));
  }, []);
  useEffect(() => {
    const newFavicon = document.createElement("link");
    newFavicon.rel = "icon";
    newFavicon.href = settings?.favIcon;
    document.head.appendChild(newFavicon);
    document.title = settings?.appName?.[locale];
  }, [dispatch, locale, settings]);
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
            path="/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />
          <Route
            path="/otp"
            element={
              <GuestRoute>
                <Otp />
              </GuestRoute>
            }
          />

          <Route
            path="/*"
            element={
              <ProtectedRoute>
                {seller?.status === sellerStatus.VERIFIED &&
                seller?.isProfileComplete ? (
                  <Seller />
                ) : seller?.status === sellerStatus.PENDING_APPROVAL &&
                  seller?.isProfileComplete ? (
                  <PendingApproval />
                ) : seller?.status === sellerStatus.BLOCKED ? (
                  <BlockedAccount />
                ) : (
                  <CompleteProfile />
                )}
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
