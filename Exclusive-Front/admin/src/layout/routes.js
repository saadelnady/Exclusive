import Product from "../components/Product/Index.jsx";
import PendingProducts from "../components/Products/PendingProducts.jsx";
import AcceptedProducts from "../components/Products/AcceptedProducts.jsx";
import BlockedProducts from "../components/Products/BlockedProducts.jsx";
import Categories from "../components/Categories/Index.js";
import AddCategory from "../components/Categories/addNewCategory.js";
import ShowCategory from "@/components/Categories/showCategory.js";
import AddSubCategory from "../components/Subcategories/addNewSubCategory.js";
import SubCategories from "../components/Subcategories/Index.js";
import ShowSubCategory from "../components/Subcategories/showSubCategory.js";
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
    path: "/categories/new",
    element: (
      <ProtectedRoute allowedRoles={[SUPER_ADMIN]}>
        <AddCategory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/categories/show/:categoryId",
    element: (
      <ProtectedRoute allowedRoles={[SUPER_ADMIN]}>
        <ShowCategory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/subCategories/show/:subCategoryId",
    element: (
      <ProtectedRoute allowedRoles={[SUPER_ADMIN]}>
        <ShowSubCategory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/subCategories",
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
    path: "/subCategories/add",
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
