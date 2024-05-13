import { NextUIProvider } from "@nextui-org/system";
import { ROLECHECK } from "constants/app.const";
import GroupDetailProvider from "layout/group-detail-provider/GroupDetailProvider";
import NotFound from "pages/404-not_found/NotFound";
import PostDetail from "pages/[...post_id]/PostDetail";
import AuthRequirement from "pages/auth-require/AuthRequirement";
import ForgotPassword from "pages/authen/ForgotPassword";
import Register from "pages/authen/Register";
import AllGroup from "pages/group/all";
import CreateGroup from "pages/group/create";
import HomeUser from "pages/home-user";
import RequestFriend from "pages/request-friend";
import Authentication from "pages/role-base-router/authentication";
import Authorization from "pages/role-base-router/authorization";
import User from "pages/user";
import Welcome from "pages/welcome";
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { adminRoutes, groupChildRoutes, mainRoutes } from "router";
import "./App.css";
import Authen from "./pages/authen";
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
    element: <Authen />,
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
                children: [
                  { path: "", element: <User /> },
                  { path: "home-user/:userId", element: <HomeUser /> },
                  { path: "home-guest/:guestId", element: <HomeG /> },
                  { path: "post/:postId/", element: <PostDetail /> },
                  { path: "*", element: <NotFound /> },
                  { path: "request-friend", element: <RequestFriend /> },
                  { path: "create-group", element: <CreateGroup /> },
                  { path: "all-group", element: <AllGroup /> },
                  {
                    element: <GroupDetailProvider />,
                    children: groupChildRoutes,
                  },
                ],
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
