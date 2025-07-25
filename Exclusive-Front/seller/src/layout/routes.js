import Home from "@/components/Home/Index.js";
import Profile from "@/components/Profile/Index.js";
import Products from "@/components/Products/Index.js";
import AddProduct from "@/components/Products/addNewProduct.js";
import EditProduct from "@/components/Products/showProduct.js";

import NotFoundPage from "../components/Shared/NotFoundPage.jsx";

import Unauthorized from "@/components/Shared/UnAuthorized/Index.js";

const allRoutes = (isWarning, handleShowWarning) => [
  { path: "/", element: <Home /> },
  { path: "/profile/:sellerId", element: <Profile /> },
  { path: "/products", element: <Products /> },
  {
    path: "/products/new",
    element: <AddProduct />,
  },
  {
    path: "/products/show/:productId",
    element: <EditProduct />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },

  { path: "*", element: <NotFoundPage navigateTo="/" /> },
];

export default allRoutes;
