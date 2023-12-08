import { NextUIProvider } from "@nextui-org/system";
import HomeUser from "pages/home-user";
import User from "pages/user";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthRequirement from "./pages/auth-require";
import Authen from "./pages/authen";
import Layout from "./pages/layout";
import Main from "./pages/main";
import Welcome from "./pages/welcome";

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
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </NextUIProvider>
  );
}

export default App;
