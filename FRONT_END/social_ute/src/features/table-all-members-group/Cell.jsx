import { Button } from "components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/dropdown";
import { MoreHorizontal } from "lucide-react";

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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Xóa thành viên</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Cấm thành viên</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellHeaderAllMembersGroup;
