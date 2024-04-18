import { ERROR_LOGIN } from "constants/error.const";
import { toast } from "react-toastify";
import { checkCodeInArray } from "utils/code-error.utils";

export const genLabelFormLogin = () => {
  return {
    phone_number: "Số điện thoại",
    pass_word: "Mật khẩu",
  };
};

export const errorHandler = (err) => {
  if (err.errors) {
    const { errors } = err;

    return toast.error(errors[0], {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  if (err.response) {
    const { code } = err.response.data;
    const messageError = checkCodeInArray(ERROR_LOGIN, code);

    return toast.error(messageError, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};
