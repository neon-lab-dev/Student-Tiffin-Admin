import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Login from "../pages/Login/Login";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Menu from "../pages/Menu/Menu";
import Users from "../pages/Users/User";
import AddProduct from "../pages/AddProduct/AddProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout/>,
    // errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Login/>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <MainLayout />,
    // errorElement: <NotFoundPage />,
    children: [
      {
        path: "menu",
        element: <Menu/>,
      },
      {
        path: "users",
        element: <Users/>,
      },
      {
        path: "add-product",
        element: <AddProduct/>,
      },
    ],
  },
]);
