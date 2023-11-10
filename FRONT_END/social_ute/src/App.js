import { NextUIProvider } from "@nextui-org/system";
<<<<<<< HEAD
=======

>>>>>>> origin/feat/register
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthRequirement from "./pages/auth-require";
import Layout from "./pages/layout";
import Login from "./pages/login";
import Main from "./pages/main";
import Welcome from "./pages/welcome";

function App() {
  return (
    <NextUIProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
<<<<<<< HEAD
          <Route path="login" element={<FormLogin />} />
=======
          <Route path="login" element={<Login />} />
>>>>>>> origin/feat/register
          <Route element={<AuthRequirement />}>
            <Route path="welcome" element={<Welcome />} />
          </Route>
        </Route>
      </Routes>
    </NextUIProvider>
  );
}

export default App;
