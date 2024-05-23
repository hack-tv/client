import { createBrowserRouter, redirect } from "react-router-dom";

import { AuthLayout, BaseLayout } from "../components/templates";
import LoginPage from "../views/LoginPage";
import HomePage from "../views/HomePage";
import Register from "../views/Register";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    loader: () => (localStorage.getItem("token") ? redirect("/") : null),
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },
  {
    element: <BaseLayout />,
    loader: () => (!localStorage.getItem("token") ? redirect("/login") : null),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
