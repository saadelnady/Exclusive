import Home from "@/components/Home/Index.js";
import Profile from "@/components/Profile/Index.js";

import NotFoundPage from "../components/Shared/NotFoundPage.jsx";

import Unauthorized from "@/components/Shared/UnAuthorized/Index.js";

const allRoutes = (isWarning, handleShowWarning) => [
  { path: "/", element: <Home /> },
  { path: "/profile/:sellerId", element: <Profile /> },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },

  { path: "*", element: <NotFoundPage navigateTo="/" /> },
];

export default allRoutes;
