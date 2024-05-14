import { logOut } from "app/slice/auth/auth.slice";
import { SSOCOOKIES } from "constants/app.const";
import { USERCOOKIES } from "constants/user.const";
import Cookies from "js-cookie";
import { logout } from "services/auth.svc";
import { errorHandler } from "utils/error-response.utils";

export const handleNavigateUser = (navigate, userID) => {
  navigate(`home-user/${userID}`);
};

export const handleNavigateRequest = (navigate) => {
  navigate("request-friend");
};

export const handleNavigateHome = (navigate) => {
  navigate("/welcome");
};

export const handleOpenModal = (openModal, onOpen) => {
  if (openModal.modal_search === true && openModal.modal_file !== true) {
    onOpen();
  } else if (openModal.modal_file === true && openModal.modal_search !== true) {
    onOpen();
  }
};

export const handleCloseModal = (openModal, setOpenModal, onClose) => {
  if (openModal.modal_search === true && openModal.modal_file !== true) {
    setOpenModal((prev) => ({
      ...prev,
      modal_search: false,
    }));

    onClose();
  } else if (openModal.modal_file === true && openModal.modal_search !== true) {
    setOpenModal((prev) => ({
      ...prev,
      modal_file: false,
    }));
    onClose();
  }
};

export const handleLogOut = async (dispatch, navigate) => {
  try {
    await logout(navigate);

    dispatch(logOut);

    Cookies.remove(USERCOOKIES.userID);
    Cookies.remove(SSOCOOKIES.access);
    navigate("/login");
  } catch (err) {
    console.log("err: ", err);
    errorHandler(err);
  }
};
