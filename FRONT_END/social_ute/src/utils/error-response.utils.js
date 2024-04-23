import { ERROR_SYSTEM } from "constants/error.const";
import { toast } from "react-toastify";
import { checkCodeInArray } from "./code-error.utils";

export const errorHandler = (err, arrayError) => {
  const showToastError = (message) => {
    return toast.error(message, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  if (err.errors) {
    const { errors: errorSchema } = err;
    return showToastError(errorSchema[0]);
  }

  if (err.response && Array.isArray(arrayError)) {
    const { code } = err.response.data;
    const messageError = checkCodeInArray(arrayError, code);
    return showToastError(messageError);
  }

  if (err.message === "Network Error") {
    return showToastError(
      "Network error, please check your internet connection.",
    );
  }

  return showToastError(ERROR_SYSTEM);
};
