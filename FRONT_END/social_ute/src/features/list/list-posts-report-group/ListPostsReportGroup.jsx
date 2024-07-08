import LoadingComponent from "combine/loading-component";
import { TYPELOADING } from "constants/type.const";
import React, { useEffect } from "react";
import ArrayEmpty from "combine/array-empty";
import CardPostReport from "./CardPostReport";
import { useAllPostReport } from "hook/manage-group/useAllPostReport";

const ListPostsReportGroup = ({ permission, role, groupId }) => {
  const { fetchAllPostsReportManage, list_report: allPostsReport } =
    useAllPostReport();

  useEffect(() => {
    fetchAllPostsReportManage(permission, role, groupId);
  }, [fetchAllPostsReportManage, groupId, permission, role]);

  return (
    <LoadingComponent
      type={TYPELOADING.TITLE}
      condition={Boolean(allPostsReport)}
    >
      <ArrayEmpty arr={allPostsReport} title="Hiện chưa có bài viết nào.">
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-2 justify-items-center">
          {allPostsReport?.map((post) => (
            <CardPostReport
              key={post.id}
              postData={post.post_id}
              userData={post.user_id}
              permission={permission}
              role={role}
              groupId={groupId}
              reason={post.reason}
              createReportTime={post.create_report_time}
              reportId={post._id}
            />
          ))}
        </div>
      </ArrayEmpty>
    </LoadingComponent>
  );
};

export default ListPostsReportGroup;
