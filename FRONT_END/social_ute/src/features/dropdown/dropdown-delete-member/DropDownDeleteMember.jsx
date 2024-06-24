import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/dropdown";
import { Button } from "components/button";
import { MoreHorizontal, Trash2 } from "lucide-react";
import ModalConfirm from "features/modal/modal-confirm";
import { useDeleteMemberGroup } from "hook/group/useDeleteMemberGroup";

const DropDownDeleteMember = ({ permission, groupId, memberId }) => {
  const { isLoading, handleDeleteMember } = useDeleteMemberGroup();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="w-[20px] hover:bg-transparent" variant="ghost">
          <MoreHorizontal size={28} strokeWidth={0.75} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="text-sm font-quick_sans">
        <ModalConfirm
          isLoading={isLoading}
          handleCallback={() =>
            handleDeleteMember(permission, groupId, memberId)
          }
          title="Xác nhận xóa thành viên."
          trigger={
            <DropdownMenuItem
              className="flex gap-2"
              onSelect={(e) => e.preventDefault()}
            >
              <Trash2 size={18} color="#d04e4e" strokeWidth={0.75} />
              <p>Xóa thành viên</p>
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownDeleteMember;
