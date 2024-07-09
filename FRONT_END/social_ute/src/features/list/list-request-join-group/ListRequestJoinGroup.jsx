import LoadingComponent from "combine/loading-component";
import { TYPELOADING } from "constants/type.const";
import { useAllRequestJoinGroup } from "hook/manage-group/useAllRequestJoinGroup";
import React, { useEffect } from "react";
import CardRequestJoinGroup from "./CardRequestJoinGroup";

const ListRequestJoinGroup = ({ permission, role, groupId }) => {
  const {
    fetchAllRequestJoinManage,
    request_join: allRequestJoins,
    isLoading,
  } = useAllRequestJoinGroup();

  useEffect(() => {
    fetchAllRequestJoinManage(permission, role, groupId);
  }, [fetchAllRequestJoinManage, groupId, permission, role]);

  return (
    <LoadingComponent type={TYPELOADING.TITLE} condition={isLoading}>
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-2">
        {allRequestJoins?.map((requestJoin) => (
          <CardRequestJoinGroup
            key={requestJoin.id}
            item={requestJoin}
            permission={permission}
            role={role}
            groupId={groupId}
            onRefresh={() =>
              fetchAllRequestJoinManage(permission, role, groupId)
            }
          />
        ))}

        {allRequestJoins?.length === 0 && <p>Chưa có yêu cầu vào nhóm nào</p>}
      </div>
    </LoadingComponent>
  );
};

export default ListRequestJoinGroup;
