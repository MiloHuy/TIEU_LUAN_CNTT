import React from "react";
import { selectRolePermission } from "app/slice/group/group.slice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ListAllPostsApprove from "features/list/list-all-posts-approve";

const ManageApprovePost = () => {
  const rolePermission = useSelector(selectRolePermission);
  const { permission, role } = rolePermission;
  const { groupId } = useParams();
  return (
    <div className="p-6 font-quick_sans flex flex-col gap-4 h-[100vh]">
      <h1 className="text-2xl font-bold">Tất cả bài viết chờ duyệt</h1>

      <ListAllPostsApprove
        permission={permission}
        role={role}
        groupId={groupId}
      />
    </div>
  );
};

export default ManageApprovePost;
