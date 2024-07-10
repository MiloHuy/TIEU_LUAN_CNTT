import { selectRolePermission } from "app/slice/group/group.slice";
import { Button } from "components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/dropdown";
import ModalConfirm from "features/modal/modal-confirm";
import { useDeleteMemberGroup } from "hook/group/useDeleteMemberGroup";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CellHeaderAllMembersGroup = ({ column }) => {
  const titleMapping = {
    name: "Tên thành viên",
    department: "Phòng ban",
    post_count: "Số bài viết",
    like_count: "Số lượt thích",
    cmt_count: "Số bình luận",
    actions: "Thao tác",
  };

  return titleMapping[column.id];
};

export const CellAction = ({ row }) => {
  const { handleDeleteMember, isLoading } = useDeleteMemberGroup();
  const rolePermission = useSelector(selectRolePermission);
  const { permission } = rolePermission;
  const { groupId } = useParams();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <ModalConfirm
          isLoading={isLoading}
          handleCallback={() =>
            handleDeleteMember(permission, groupId, row.original.user_id._id)
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
        <DropdownMenuSeparator />
        <DropdownMenuItem>Cấm thành viên</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellHeaderAllMembersGroup;
