import { NextUIProvider } from "@nextui-org/system";
import { ROLECHECK } from "constants/app.const";
import NotFound from "pages/404-not_found/NotFound";
import AuthRequirement from "pages/auth-require/AuthRequirement";
import ForgotPassword from "pages/authen/ForgotPassword";
import Login from "pages/authen/Login";
import Register from "pages/authen/Register";
import Authentication from "pages/role-base-router/authentication";
import Authorization from "pages/role-base-router/authorization";
import Welcome from "pages/welcome";
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { adminRoutes, mainRoutes, userRoutes } from "router";
import "./App.css";
import Main from "./pages/main";

const HomeG = lazy(() => import("pages/home-guests"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: mainRoutes,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "forgot_password",
    element: <ForgotPassword />,
  },
  {
    element: <AuthRequirement />,
    children: [
      {
        element: <Authentication />,
        children: [
          {
            element: <Authorization roles={ROLECHECK.role_user} />,
            children: [
              {
                path: "welcome",
                element: <Welcome />,
                children: userRoutes,
              },
            ],
          },
          {
            element: <Authorization roles={ROLECHECK.role_admin} />,
            children: adminRoutes,
          },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  );
}

export default App;
