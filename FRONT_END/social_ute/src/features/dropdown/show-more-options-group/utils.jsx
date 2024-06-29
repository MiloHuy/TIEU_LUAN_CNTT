import { DropdownMenuItem } from "components/dropdown";
import fa from "dayjs/locale/fa";
import ModalConfirm from "features/modal/modal-confirm/ModalConfirm";
import ModalListRegulations from "features/modal/modal-list-regulations";
import { useLeaveGroup } from "hook/group/useLeaveGroup";
import { useParams } from "react-router-dom";
import { checkPermissionMethod } from "utils/auth.utils";

export const RenderContentDropDown = (permission, title, role) => {
  const { isLoading, handleLeaveGroup } = useLeaveGroup();
  const { groupId } = useParams();

  switch (true) {
    case checkPermissionMethod(permission, {
      action: "groupRegulations",
      role: role,
    }) !== false:
      return (
        <ModalListRegulations
          trigger={
            <DropdownMenuItem
              className="flex gap-2"
              onSelect={(e) => e.preventDefault()}
            >
              <p>{title}</p>
            </DropdownMenuItem>
          }
        />
      );
    case checkPermissionMethod(permission, {
      action: "myPosts",
      role: role,
    }) !== false:
      return (
        <DropdownMenuItem
          className="flex gap-2"
          onSelect={(e) => e.preventDefault()}
        >
          <p>{title}</p>
        </DropdownMenuItem>
      );
    case checkPermissionMethod(permission, {
      action: "post_wait_approve",
      role: role,
    }) !== false:
      return (
        <DropdownMenuItem
          className="flex gap-2"
          onSelect={(e) => e.preventDefault()}
        >
          <p>{title}</p>
        </DropdownMenuItem>
      );
    case checkPermissionMethod(permission, {
      action: "leaveGroup",
      role: role,
    }) !== false:
      return (
        <ModalConfirm
          trigger={
            <DropdownMenuItem
              className="flex gap-2"
              onSelect={(e) => e.preventDefault()}
            >
              <p>{title}</p>
            </DropdownMenuItem>
          }
          title="Bạn có chắc là rời nhóm ?"
          isLoading={isLoading}
          handleCallback={() => handleLeaveGroup(permission, groupId)}
        />
      );
    default:
      return null;
  }
};
