import { DropdownMenuItem } from "components/dropdown";
import { ERoleNameGroup } from "constants/group/enum";
import ModalConfirm from "features/modal/modal-confirm/ModalConfirm";
import ModalListRegulations from "features/modal/modal-list-regulations";
import { useLeaveGroup } from "hook/group/useLeaveGroup";
import { useParams } from "react-router-dom";

export const RenderContentDropDown = (permission, title, role, action) => {
  const { isLoading, handleLeaveGroup } = useLeaveGroup();
  const { groupId } = useParams();

  switch (action) {
    case "groupRegulations":
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
    case "myPosts":
      return (
        <DropdownMenuItem
          className="flex gap-2"
          onSelect={(e) => e.preventDefault()}
        >
          <p>{title}</p>
        </DropdownMenuItem>
      );
    case "post_wait_approve":
      return (
        <DropdownMenuItem className="flex gap-2">
          <p>{title}</p>
        </DropdownMenuItem>
      );
    case "leaveGroup":
      return (
        <ModalConfirm
          trigger={
            <DropdownMenuItem
              className="flex gap-2 p-6"
              onSelect={(e) => {
                e.preventDefault();
              }}
            >
              <p>{title}</p>
            </DropdownMenuItem>
          }
          title="Bạn có chắc là rời nhóm ?"
          isWarning={true}
          description={
            role === ERoleNameGroup.SUPERADMIN
              ? "Nhóm sẽ không còn tồn tại sau khi bạn rời đi"
              : ""
          }
          isLoading={isLoading}
          handleCallback={() => handleLeaveGroup(permission, groupId)}
        />
      );

    default:
      return;
  }
};
