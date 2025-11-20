import { Navigate } from "react-router";

export const itensMenuShop = [
  {
    id: 1,
    name: "Home",
    path: "/",
    element: <Navigate to="/" />,
  },
  {
    id: 2,
    name: "Products",
    path: "/products",
    element: <Navigate to="/products" />,
  },
  {
    id: 3,
    name: "About",
    path: "/about",
    element: <Navigate to="/about" />,
  },
  {
    id: 4,
    name: "Contact",
    path: "/contact",
    element: <Navigate to="/contact" />,
  },
];

export const itensMenuAdmin = [
  {
    id: 1,
    name: "Dashboard",
    path: "/dashboard",
    element: <Navigate to="/dashboard" />,
  },
  {
    id: 2,
    name: "Manage Products",
    path: "/manage-products",
    element: <Navigate to="/manage-products" />,
  },
  {
    id: 3,
    name: "Manage Categories",
    path: "/manage-categories",
    element: <Navigate to="/manage-categories" />,
  },
  {
    id: 4,
    name: "Manage Users",
    path: "/manage-users",
    element: <Navigate to="/manage-users" />,
  },
  {
    id: 5,
    name: "Manage Orders",
    path: "/manage-orders",
    element: <Navigate to="/manage-orders" />,
  }
];