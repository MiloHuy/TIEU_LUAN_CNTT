import { NextUIProvider } from "@nextui-org/system";
import NotFound from "pages/404-not_found/NotFound";
import Admin from "pages/admin";
import HomeUser from "pages/home-user";
import Manage from "pages/manage";
import ManageAccount from "pages/manage-account";
import ManagePosts from "pages/manage-posts";
import RequestFriend from "pages/request-friend";
import User from "pages/user";
import Welcome from "pages/welcome";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthRequirement from "./pages/auth-require";
import Authen from "./pages/authen";
import Layout from "./pages/layout";
import Main from "./pages/main";

const HomeG = lazy(() => import("pages/home-guests"));

function App() {
  return (
    <NextUIProvider>
      <Suspense fallback="loading">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="login" element={<Authen />} />

            <Route element={<AuthRequirement />}>
              <Route path="welcome" element={<Welcome />}>
                <Route index element={<User />} />
                <Route path="home-user/:userId" element={<HomeUser />} />

                <Route path="home-guest/:guestId" element={<HomeG />} />

                <Route path="request-friend" element={<RequestFriend />} />
              </Route>

              <Route path="manage" element={<Manage />}>
                <Route index element={<Admin />} />
                <Route path="accounts" element={<ManageAccount />} />

                <Route path="posts" element={<ManagePosts />} />

                <Route path="request-friend" element={<RequestFriend />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </NextUIProvider>
  );
}

export default App;
