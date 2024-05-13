import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "sonner";
import { store } from "./app/store/store";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />

    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <Toaster richColors position="top-center" />
  </Provider>,
);
