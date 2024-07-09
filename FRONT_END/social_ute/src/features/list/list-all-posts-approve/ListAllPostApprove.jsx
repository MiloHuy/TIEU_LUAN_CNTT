import LoadingComponent from "combine/loading-component";
import { TYPELOADING } from "constants/type.const";
import { useAllPostsApprove } from "hook/manage-group/useAllPostsApprove";
import React, { useEffect } from "react";
import CardPostApprove from "./CardPostApprove";
import ArrayEmpty from "combine/array-empty";

const ListAllPostApprove = ({ permission, role, groupId }) => {
  const { fetchAllPostsApproveManage, posts: allPostsApprove } =
    useAllPostsApprove();

  useEffect(() => {
    fetchAllPostsApproveManage(permission, role, groupId);
  }, [fetchAllPostsApproveManage, groupId, permission, role]);

  return (
    <LoadingComponent
      type={TYPELOADING.TITLE}
      condition={Boolean(allPostsApprove)}
    >
      <ArrayEmpty arr={allPostsApprove} title="Hiện chưa có bài viết nào.">
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-2 justify-items-center w-full">
          {allPostsApprove?.map((post) => (
            <CardPostApprove
              key={post.id}
              postData={post}
              permission={permission}
              role={role}
              groupId={groupId}
              onRefresh={() =>
                fetchAllPostsApproveManage(permission, role, groupId)
              }
            />
          ))}
        </div>
      </ArrayEmpty>
    </LoadingComponent>
  );
};

export default ListAllPostApprove;
