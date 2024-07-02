import { logOut } from "app/slice/auth/auth.slice";
import { SSOCOOKIES } from "constants/app.const";
import { ERR_CREATE_POST } from "constants/error.const";
import { USERCOOKIES } from "constants/user.const";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { logout } from "services/auth.svc";
import { createPost } from "services/post/api-post.svc";
import { errorHandler } from "utils/error-response.utils";
import { handleRevokeBlobUrl } from "utils/file.utils";
import ModalGroup from "features/modal/modal-group/ModalGroup";
import ModalSearchUser from "features/modal/modal-search-user/ModalSearchUser";
import ModalUploadFile from "features/modal/modal-upload-image-file/ModalUploadFile";
import popupNofication from "features/popup/popup-nofication";
import {
  Bell,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  UserCircle2,
  UserPlus,
  Users,
} from "lucide-react";

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

export const handleCreatePost = async (values, files, images) => {
  try {
    const formData = new FormData();
    formData.append("post_description", values["post_description"]);
    for (const file of files) {
      formData.append("post_img", file);
    }
    formData.append("privacy", values["privacy"]);

    await createPost(formData);

    toast.success("Đăng bài viết thành công!!!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    handleRevokeBlobUrl(images);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } catch (err) {
    errorHandler(err, ERR_CREATE_POST);
  }
};

export const renderButtonsSidebarUser = (navigate, userID, dispatch) => {
  return [
    {
      Icon: Home,
      text: "Trang chủ",
      onClick: () => handleNavigateHome(navigate),
      isModal: false,
    },
    {
      Icon: Search,
      text: "Tìm kiếm",
      onClick: null,
      isModal: true,
      ModalComponent: ModalSearchUser,
      modalProps: { className: "w-[55vw] h-[70vh]" },
    },
    {
      Icon: MessageCircle,
      text: "Tin nhắn",
      onClick: null,
      isModal: false,
    },
    {
      Icon: Bell,
      text: "Thông báo",
      onClick: null,
      isModal: true,
      ModalComponent: popupNofication,
      modalProps: {},
    },
    {
      Icon: UserCircle2,
      text: "Trang cá nhân",
      onClick: () => handleNavigateUser(navigate, userID),
      isModal: false,
    },
    {
      Icon: Users,
      text: "Nhóm",
      onClick: null,
      isModal: true,
      ModalComponent: ModalGroup,
      modalProps: {},
    },
    {
      Icon: UserPlus,
      text: "Yêu cầu",
      onClick: () => handleNavigateRequest(navigate),
      isModal: false,
    },
    {
      Icon: PlusSquare,
      text: "Tạo",
      onClick: null,
      isModal: true,
      ModalComponent: ModalUploadFile,
      modalProps: {
        onUpload: handleCreatePost,
      },
    },
    {
      Icon: LogOut,
      text: "Đăng xuất",
      onClick: () => handleLogOut(dispatch, navigate),
      isModal: false,
    },
  ];
};