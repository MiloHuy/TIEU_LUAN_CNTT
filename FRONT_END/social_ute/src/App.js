import { NextUIProvider } from "@nextui-org/system";

import Admin from "pages/admin";
import Authen from "pages/authen";
import ManageAccount from "pages/manage-account";
import User from "pages/user";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthRequirement from "./pages/auth-require";
import Layout from "./pages/layout";
import Main from "./pages/main";
import Welcome from "./pages/welcome";

function App() {
  return (
    <NextUIProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="login" element={<Authen />} />
          <Route element={<AuthRequirement />}>
            <Route path="welcome" element={<Welcome />}>
              <Route index element={<User />} />
            </Route>
            <Route path="admin" element={<Admin />}>
              <Route path="manage_account" element={<ManageAccount />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </NextUIProvider>
  );
}

export default App;
