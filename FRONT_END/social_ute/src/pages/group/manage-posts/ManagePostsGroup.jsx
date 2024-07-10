import { selectRolePermission } from "app/slice/group/group.slice";
import ListAllPostsGroup from "features/list/list-all-posts-groups";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ManagePostsGroup = () => {
  const rolePermission = useSelector(selectRolePermission);
  const { permission, role } = rolePermission;
  const { groupId } = useParams();

  return (
    <div className="p-6 font-quick_sans flex flex-col gap-4 h-[100vh]">
      <h1 className="text-2xl font-bold">Tất cả bài viết trong nhóm</h1>

      <ListAllPostsGroup
        permission={permission}
        role={role}
        groupId={groupId}
      />
    </div>
  );
};

export default ManagePostsGroup;
