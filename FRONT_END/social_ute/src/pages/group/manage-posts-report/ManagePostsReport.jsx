import React from "react";
import { selectRolePermission } from "app/slice/group/group.slice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ListPostsReportGroup from "features/list/list-posts-report-group";

const ManagePostsReport = () => {
  const rolePermission = useSelector(selectRolePermission);
  const { permission, role } = rolePermission;
  const { groupId } = useParams();
  return (
    <div className="p-6 font-quick_sans flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Tất cả bài viết bị báo cáo</h1>

      <ListPostsReportGroup
        permission={permission}
        role={role}
        groupId={groupId}
      />
    </div>
  );
};

export default ManagePostsReport;
