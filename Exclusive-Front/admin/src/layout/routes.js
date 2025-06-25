import Product from "../components/Product/Index.jsx";
import PendingProducts from "../components/Products/PendingProducts.jsx";
import AcceptedProducts from "../components/Products/AcceptedProducts.jsx";
import BlockedProducts from "../components/Products/BlockedProducts.jsx";
import Categories from "../components/Categories/Categories.jsx";
import AddCategory from "../components/AddCategory/AddCategory.jsx";
import AddSubCategory from "../components/AddsubCategory/AddSubCategory.jsx";
import SubCategories from "../components/SubCategories/SubCategories.jsx";
import Seller from "../components/Seller/Index.jsx";
import NotFoundPage from "../components/Shared/NotFoundPage.jsx";
import AllAdmins from "@/components/admins/Index.js";
import AddNewAdmin from "@/components/admins/addNewAdmin.js";
import ShowAdmin from "@/components/admins/showAdmin.js";
import Home from "@/components/Home/Index.js";
import Profile from "@/components/Profile/Index.js";
import ProtectedRoute from "./ProtectedRoute.js";
import { SUPER_ADMIN } from "../helpers/roles.js";
import Unauthorized from "@/components/Shared/UnAuthorized/Index.js";
import ShowUser from "@/components/users/showUser.js";
import AllUsers from "@/components/users";

const allRoutes = (isWarning, handleShowWarning) => [
  { path: "/", element: <Home /> },
  {
    path: "/admins",
    element: (
      <ProtectedRoute allowedRoles={[SUPER_ADMIN]}>
        <AllAdmins
          isWarning={isWarning}
          handleShowWarning={handleShowWarning}
        />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admins/new",
    element: (
      <ProtectedRoute allowedRoles={[SUPER_ADMIN]}>
        <AddNewAdmin
          isWarning={isWarning}
          handleShowWarning={handleShowWarning}
        />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admins/show/:adminId",
    element: (
      <ProtectedRoute allowedRoles={[SUPER_ADMIN]}>
        <ShowAdmin
          isWarning={isWarning}
          handleShowWarning={handleShowWarning}
        />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute>
        <AllUsers isWarning={isWarning} handleShowWarning={handleShowWarning} />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users/show/:userId",
    element: (
      <ProtectedRoute>
        <ShowUser isWarning={isWarning} handleShowWarning={handleShowWarning} />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admins/:adminId",
    element: (
      <ProtectedRoute allowedRoles={[SUPER_ADMIN]}>
        <AddNewAdmin
          isWarning={isWarning}
          handleShowWarning={handleShowWarning}
        />
      </ProtectedRoute>
    ),
  },
  { path: "/profile/:adminId", element: <Profile /> },
  {
    path: "/products/:productId",
    element: (
      <Product isWarning={isWarning} handleShowWarning={handleShowWarning} />
    ),
  },
  {
    path: "/pending-products",
    element: (
      <PendingProducts
        isWarning={isWarning}
        handleShowWarning={handleShowWarning}
      />
    ),
  },
  {
    path: "/accepted-products",
    element: (
      <AcceptedProducts
        isWarning={isWarning}
        handleShowWarning={handleShowWarning}
      />
    ),
  },
  {
    path: "/blocked-products",
    element: (
      <BlockedProducts
        isWarning={isWarning}
        handleShowWarning={handleShowWarning}
      />
    ),
  },
  {
    path: "/categories",
    element: (
      <ProtectedRoute allowedRoles={[SUPER_ADMIN]}>
        <Categories
          isWarning={isWarning}
          handleShowWarning={handleShowWarning}
        />
      </ProtectedRoute>
    ),
  },
  {
    path: "/add-category",
    element: (
      <ProtectedRoute allowedRoles={[SUPER_ADMIN]}>
        <AddCategory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/categories/editCategory/:categoryId",
    element: (
      <ProtectedRoute allowedRoles={[SUPER_ADMIN]}>
        <AddCategory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sub-categories/:subCategoryId",
    element: (
      <ProtectedRoute allowedRoles={[SUPER_ADMIN]}>
        <AddSubCategory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sub-categories",
    element: (
      <ProtectedRoute allowedRoles={[SUPER_ADMIN]}>
        <SubCategories
          isWarning={isWarning}
          handleShowWarning={handleShowWarning}
        />
      </ProtectedRoute>
    ),
  },
  {
    path: "/add-sub-category",
    element: (
      <ProtectedRoute allowedRoles={[SUPER_ADMIN]}>
        <AddSubCategory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/seller/:sellerId",
    element: (
      <Seller isWarning={isWarning} handleShowWarning={handleShowWarning} />
    ),
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  { path: "*", element: <NotFoundPage navigateTo="/" /> },
];

export default allRoutes;
