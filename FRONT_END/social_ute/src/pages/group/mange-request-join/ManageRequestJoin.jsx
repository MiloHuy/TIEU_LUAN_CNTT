import React from "react";
import { selectRolePermission } from "app/slice/group/group.slice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ListRequestJoinGroup from "features/list/list-request-join-group";

const ManageRequestJoin = () => {
  const rolePermission = useSelector(selectRolePermission);
  const { permission, role } = rolePermission;
  const { groupId } = useParams();

  return (
    <div className="p-6 font-quick_sans flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Yêu cầu vào nhóm</h1>

      <ListRequestJoinGroup
        permission={permission}
        role={role}
        groupId={groupId}
      />
    </div>
  );
};

export default ManageRequestJoin;
