import { Button } from "components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "components/dropdown";
import { ERoleNameGroup } from "constants/group/enum";
import { catePermiss, endPointsManageGroup, groupPermission, methodManageGroup } from "constants/group/permission.const";
import ModalListRegulations from "features/modal/modal-list-regulations";
import { ChevronDown } from 'lucide-react';
import { Fragment } from "react";

const contentDropdown = [
  {
    title: 'Nội quy của nhóm',
    value: {
      category: catePermiss.SEE,
      method: groupPermission[ERoleNameGroup.SUPERADMIN]['groupRegulations'].method,
      endPoint: groupPermission[ERoleNameGroup.SUPERADMIN]['groupRegulations'].endPoint
    }
  },
  {
    title: "Bài viết của bạn",
    value: {
      category: catePermiss.POST,
      method: groupPermission[ERoleNameGroup.SUPERADMIN]['myPosts'].method,
      endPoint: groupPermission[ERoleNameGroup.SUPERADMIN]['myPosts'].endPoint
    }
  },
  {
    title: "Bài viết chờ duyệt",
    value: {
      category: catePermiss.POST,
      method: groupPermission[ERoleNameGroup.MEMBER]['post_wait_approve']?.method,
      endPoint: groupPermission[ERoleNameGroup.MEMBER]['post_wait_approve']?.endPoint
    }
  },
  {
    title: "Quản lý nhóm",
    value: {
      category: catePermiss.MANAGE_INTERACT,
      method:
        methodManageGroup(groupPermission[ERoleNameGroup.SUPERADMIN]['manageGroup'])
        ||
        methodManageGroup(groupPermission[ERoleNameGroup.SUPERADMIN]['managePost'])
        ||
        methodManageGroup(groupPermission[ERoleNameGroup.SUPERADMIN]['manageInteract']),
      endPoint:
        endPointsManageGroup(groupPermission[ERoleNameGroup.SUPERADMIN]['manageGroup'])
        ||
        endPointsManageGroup(groupPermission[ERoleNameGroup.SUPERADMIN]['managePost'])
        ||
        endPointsManageGroup(groupPermission[ERoleNameGroup.SUPERADMIN]['manageInteract'])
    }
  },
]

const renderContentDropDown = (value, title) => {
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
    default:
      return null
  }
}

const DropDownShowMoreOptionsGroup = ({ permission }) => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className='w-[40px] hover:bg-transparent' variant='outline'>
          <ChevronDown size={28} strokeWidth={0.75} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='text-sm font-quick_sans'>
        {contentDropdown.map((item, index) => {
          return (
            <Fragment key={index}>
              {permission[item.value.category].hasOwnProperty(item.value.method) && (
                renderContentDropDown(item.value.endPoint, item.title)
              )}
            </Fragment>
          )
        })}

        <DropdownMenuItem className='flex gap-2' onSelect={(e) => e.preventDefault()}>
          <p>Chia sẻ nhóm</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}

export default DropDownShowMoreOptionsGroup
