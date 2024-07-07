import LoadingComponent from "combine/loading-component";
import { TYPELOADING } from "constants/type.const";
import { useAllRequestJoinGroup } from "hook/manage-group/useAllRequestJoinGroup";
import React, { useEffect } from "react";
import CardRequestJoinGroup from "./CardRequestJoinGroup";
import ArrayEmpty from "combine/array-empty";

const ListRequestJoinGroup = ({ permission, role, groupId }) => {
  const { fetchAllRequestJoinManage, request_join: allRequestJoins } =
    useAllRequestJoinGroup();

  useEffect(() => {
    fetchAllRequestJoinManage(permission, role, groupId);
  }, [fetchAllRequestJoinManage, groupId, permission, role]);

  return (
    <LoadingComponent
      type={TYPELOADING.TITLE}
      condition={Boolean(allRequestJoins)}
    >
      <ArrayEmpty array={allRequestJoins} title="Hiện chưa có yêu cầu nào.">
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-2">
          {allRequestJoins?.map((requestJoin) => (
            <CardRequestJoinGroup
              key={requestJoin.id}
              item={requestJoin}
              permission={permission}
              role={role}
              groupId={groupId}
            />
          ))}
        </div>
      </ArrayEmpty>
    </LoadingComponent>
  );
};

export default ListRequestJoinGroup;
