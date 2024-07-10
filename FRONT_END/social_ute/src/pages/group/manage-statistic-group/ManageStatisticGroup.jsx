import React from "react";
import { selectRolePermission } from "app/slice/group/group.slice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ChartManageGroup from "features/chart/chart-manage-group";

const ManageStatisticGroup = () => {
  const rolePermission = useSelector(selectRolePermission);
  const { permission, role } = rolePermission;
  const { groupId } = useParams();

  return (
    <div className="p-6 font-quick_sans flex flex-col gap-4 h-[100vh]">
      <h1 className="text-2xl font-bold">Thống kê trong nhóm</h1>

      <ChartManageGroup permission={permission} role={role} groupId={groupId} />
    </div>
  );
};

export default ManageStatisticGroup;
