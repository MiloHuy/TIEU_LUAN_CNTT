import { NextUIProvider } from "@nextui-org/system";
import Loading from "components/loading";
import { ROLECHECK } from "constants/app.const";
import NotFound from "pages/404-not_found/NotFound";
import PostDetail from "pages/[...post_id]/PostDetail";
import Admin from "pages/admin";
import AuthRequirement from "pages/auth-require/AuthRequirement";
import HomeUser from "pages/home-user";
import About from "pages/main/About";
import Home from "pages/main/Home";
import Report from "pages/main/Report";
import Manage from "pages/manage";
import ManageAccount from "pages/manage-account";
import ManagePosts from "pages/manage-posts";
import RequestFriend from "pages/request-friend";
import Authentication from "pages/role-base-router/authentication";
import Authorization from "pages/role-base-router/authorization";
import Statistical from "pages/statistical";
import User from "pages/user";
import Welcome from "pages/welcome";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Authen from "./pages/authen";
import Main from "./pages/main";

const HomeG = lazy(() => import("pages/home-guests"));

function App() {
  return (
    <NextUIProvider>
      <Suspense fallback="loading">
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/report" element={<Report />} />
          </Route>

          <Route path="login" element={<Authen />} />

          <Route element={<AuthRequirement />}>
            <Route element={<Authentication />}>
              <Route element={<Authorization roles={ROLECHECK.role_user} />}>
                <Route path="welcome" element={<Welcome />}>
                  <Route index element={<User />} />
                  <Route path="home-user/:userId" element={<HomeUser />} />

                  <Route
                    path="home-guest/:guestId"
                    element={
                      <Suspense fallback={<Loading />}>
                        <HomeG />
                      </Suspense>
                    }
                  />

                  <Route path="post/:postId/" element={<PostDetail />} />

                  <Route path="*" element={<NotFound />} />
                  <Route path="request-friend" element={<RequestFriend />} />
                </Route>
              </Route>

              <Route element={<Authorization roles={ROLECHECK.role_admin} />}>
                <Route path="manage" element={<Manage />}>
                  <Route index element={<Admin />} />
                  <Route path="accounts" element={<ManageAccount />} />

                  <Route path="posts" element={<ManagePosts />} />
                  <Route path="statistics" element={<Statistical />} />
                </Route>
              </Route>
            </Route>

            <Route
              path="*"
              element={
                <div clasName="w-full h-screen">
                  <NotFound />
                </div>
              }
            />
          </Route>
          <Route
            path="*"
            element={
              <div clasName="w-full h-screen">
                <NotFound />
              </div>
            }
          />
        </Routes>
      </Suspense>
    </NextUIProvider>
  );
}

export default App;
