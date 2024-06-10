import {
  DropdownMenuItem
} from "components/dropdown";
import { ERoleNameGroup } from "constants/group/enum";
import { endPointsManageGroup, groupPermission } from "constants/group/permission.const";
import ModalConfirm from "features/modal/modal-confirm/ModalConfirm";
import ModalListRegulations from "features/modal/modal-list-regulations";
import { useLeaveGroup } from "hook/group/useLeaveGroup";
import { useParams } from "react-router-dom";

export const RenderContentDropDown = (permission, value, title) => {
  const { isLoading, handleLeaveGroup } = useLeaveGroup()
  const { groupId } = useParams()

  switch (value) {
    case groupPermission[ERoleNameGroup.SUPERADMIN]['groupRegulations'].endPoint:
      return (
        <ModalListRegulations
          trigger={
            <DropdownMenuItem
              className='flex gap-2'
              onSelect={(e) => e.preventDefault()}
            >
              <p>{title}</p>
            </DropdownMenuItem>
          }
        />
      )
    case groupPermission[ERoleNameGroup.SUPERADMIN]['myPosts'].endPoint:
      return (
        <DropdownMenuItem className='flex gap-2' onSelect={(e) => e.preventDefault()}>
          <p>{title}</p>
        </DropdownMenuItem>
      )
    case "post_wait_approve":
      return (
        <DropdownMenuItem className='flex gap-2' onSelect={(e) => e.preventDefault()}>
          <p>{title}</p>
        </DropdownMenuItem>
      )
    case
      endPointsManageGroup(groupPermission[ERoleNameGroup.SUPERADMIN]['manageGroup'])
      ||
      endPointsManageGroup(groupPermission[ERoleNameGroup.SUPERADMIN]['managePost'])
      ||
      endPointsManageGroup(groupPermission[ERoleNameGroup.SUPERADMIN]['manageInteract']):
      return (
        <DropdownMenuItem className='flex gap-2' onSelect={(e) => e.preventDefault()}>
          <p>{title}</p>
        </DropdownMenuItem>
      )
    case groupPermission[ERoleNameGroup.MEMBER]["leaveGroup"]?.endPoint:
      return (
        <ModalConfirm
          trigger={
            <DropdownMenuItem className='flex gap-2' onSelect={(e) => e.preventDefault()}>
              <p>{title}</p>
            </DropdownMenuItem>
          }

          title="Bạn có chắc là rời nhóm ?"
          isLoading={isLoading}

          handleCallback={() => handleLeaveGroup(permission, groupId)}
        />
      )
    default:
      return null
  }
}