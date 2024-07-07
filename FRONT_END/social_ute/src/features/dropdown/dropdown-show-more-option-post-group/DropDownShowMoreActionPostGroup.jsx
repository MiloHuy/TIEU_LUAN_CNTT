import React, { useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/dropdown";
import { Button } from "components/button";
import { MoreHorizontal, OctagonAlert, Trash2 } from "lucide-react";
import ModalConfirm from "features/modal/modal-confirm";
import { checkPermissionMethod } from "utils/auth.utils";
import { toast } from "react-toastify";
import { EMessGroup } from "constants/group/enum";
import { TOAST_OPTION_DEFAULT } from "constants/toast.const";
import { useDeletePostGroup } from "hook/group/useDeletePostGroup";
import { useParams } from "react-router-dom";

const DropDownShowMoreActionPostGroup = ({ permission, role, postId }) => {
  const { handleDeletePostGroup, isLoading } = useDeletePostGroup();
  const { groupId } = useParams();

  const renderItemDeletePost = useMemo(() => {
    const url = checkPermissionMethod(permission, {
      action: "deletePost",
      role,
    });

    if (!url)
      return toast.error(EMessGroup.DONT_HAVE_PERMISSION, TOAST_OPTION_DEFAULT);

    return (
      <ModalConfirm
        isLoading={isLoading}
        handleCallback={() => handleDeletePostGroup(url, groupId, postId)}
        title="Xác nhận xóa bài viết của mình."
        trigger={
          <DropdownMenuItem
            className="flex gap-2"
            onSelect={(e) => e.preventDefault()}
          >
            <Trash2 size={18} color="#cb0b0b" strokeWidth={0.75} />
            <p>Xóa bài viết</p>
          </DropdownMenuItem>
        }
      />
    );
  }, [permission, role, isLoading, handleDeletePostGroup, groupId, postId]);

  const renderItemReportPost = useMemo(() => {
    const url = checkPermissionMethod(permission, {
      action: "reportPost",
      role,
    });

    if (!url)
      return toast.error(EMessGroup.DONT_HAVE_PERMISSION, TOAST_OPTION_DEFAULT);

    return (
      <DropdownMenuItem
        className="flex gap-2"
        onSelect={(e) => e.preventDefault()}
      >
        <OctagonAlert size={18} color="#cb0b0b" strokeWidth={1.25} />
        <p>Báo cáo bài viết</p>
      </DropdownMenuItem>
    );
  }, [permission, role]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="w-[20px] hover:bg-transparent" variant="ghost">
          <MoreHorizontal size={28} strokeWidth={0.75} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="text-sm font-quick_sans">
        {renderItemReportPost}
        {renderItemDeletePost}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownShowMoreActionPostGroup;
