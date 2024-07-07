import { selectRolePermission } from "app/slice/group/group.slice";
import TableAllMemberGroup from "features/table-all-members-group/TableAllMemberGroup";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ManageMembers = () => {
  const rolePermission = useSelector(selectRolePermission);
  const { permission, role } = rolePermission;
  const { groupId } = useParams();

  return (
    <div className="p-6 font-quick_sans flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Tất cả thành viên</h1>

      <TableAllMemberGroup
        permission={permission}
        role={role}
        groupId={groupId}
      />
    </div>
  );
};

export default ManageMembers;
