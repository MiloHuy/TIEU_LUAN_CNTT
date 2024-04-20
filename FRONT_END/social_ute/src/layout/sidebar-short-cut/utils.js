import { Button } from "components/button";
import ModalGroup from "features/modal/modal-group";
import ModalUploadFile from "features/modal/modal-upload-image-file/ModalUploadFile";
import PopupNofication from "features/popup/popup-nofication";
import {
  handleLogOut,
  handleNavigateHome,
  handleNavigateRequest,
  handleNavigateUser,
  handleOpenModelSearch,
} from "layout/sidebar-user/utils";
import { Bell } from "lucide-react";

export const genTriggerSidebar = (
  icon,
  index,
  userID,
  onOpen,
  onClose,
  navigate,
  openModal,
  setOpenModal,
  dispatch,
) => {
  switch (index) {
    case 0:
      return (
        <Button
          variant="ghost"
          key={index}
          onClick={() => handleNavigateHome(navigate)}
        >
          {icon.icon}
        </Button>
      );
    case 1:
      return (
        <Button
          variant="ghost"
          key={index}
          onClick={() => handleOpenModelSearch(setOpenModal)}
        >
          {icon.icon}
        </Button>
      );
    case 2:
      return (
        <Button variant="ghost" key={index}>
          {icon.icon}
        </Button>
      );
    case 3:
      return (
        <PopupNofication
          trigger={
            <Button variant="ghost">
              <Bell size={24} strokeWidth={1.5} />
            </Button>
          }
        />
      );
    case 4:
      return (
        <Button
          variant="ghost"
          onClick={() => handleNavigateUser(navigate, userID)}
        >
          {icon.icon}
        </Button>
      );
    case 5:
      return (
        <ModalGroup trigger={<Button variant="ghost">{icon.icon}</Button>} />
      );
    case 6:
      return (
        <Button variant="ghost" onClick={() => handleNavigateRequest(navigate)}>
          {icon.icon}
        </Button>
      );
    case 7:
      return (
        <ModalUploadFile
          trigger={<Button variant="ghost">{icon.icon}</Button>}
        />
      );
    case 8:
      return (
        <Button
          variant="ghost"
          onClick={() => handleLogOut(dispatch, navigate)}
        >
          {icon.icon}
        </Button>
      );
    default:
      return null;
  }
};
