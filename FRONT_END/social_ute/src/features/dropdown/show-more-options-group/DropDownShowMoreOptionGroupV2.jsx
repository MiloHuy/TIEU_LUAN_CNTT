import { Button } from "components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "components/dropdown";
import { ERoleNameGroup } from "constants/group/enum";
import { groupPermission } from "constants/group/permission.const";
import ModalListRegulations from "features/modal/modal-list-regulations";
import { ChevronDown } from 'lucide-react';
import { Fragment } from "react";

const contentDropdown = [
  {
    title: 'Nội quy của nhóm',
    permissionKey: 'groupRegulations'
  },
  {
    title: "Bài viết của bạn",
    permissionKey: 'myPosts'
  },
  {
    title: "Bài viết chờ duyệt",
    permissionKey: 'post_wait_approve'
  },
  {
    title: "Quản lý nhóm",
    permissionKey: 'manageGroup'
  },
]

const renderContentDropDown = (title, permissionKey) => {
  const permission = groupPermission[ERoleNameGroup.SUPERADMIN][permissionKey];
  const isEndPoint = permission.endPoint === permissionKey;
  const isManageGroup = permissionKey === 'manageGroup';

  if (isEndPoint || isManageGroup) {
    return (
      <ModalListRegulations
        trigger={
          <DropdownMenuItem className='flex gap-2' onSelect={(e) => e.preventDefault()}>
            <p>{title}</p>
          </DropdownMenuItem>
        }
      />
    )
  }

  return (
    <DropdownMenuItem className='flex gap-2' onSelect={(e) => e.preventDefault()}>
      <p>{title}</p>
    </DropdownMenuItem>
  )
}

const renderDropdownItems = (permission) => {
  return contentDropdown.map((item, index) => {
    const { category, method } = groupPermission[ERoleNameGroup.SUPERADMIN][item.permissionKey];
    if (permission[category].includes(method)) {
      return (
        <Fragment key={index}>
          {renderContentDropDown(item.title, item.permissionKey)}
        </Fragment>
      )
    }
    return null;
  });
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
        {renderDropdownItems(permission)}

        <DropdownMenuItem className='flex gap-2' onSelect={(e) => e.preventDefault()}>
          <p>Chia sẻ nhóm</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}

export default DropDownShowMoreOptionsGroup
