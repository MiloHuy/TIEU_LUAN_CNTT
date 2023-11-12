import { NextUIProvider } from "@nextui-org/system";

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
          <Route path="login" element={<Welcome />} />
          <Route element={<AuthRequirement />}>
            <Route path="welcome" element={<Welcome />} />
          </Route>
        </Route>
      </Routes>
    </NextUIProvider>
  );
}

export default App;
