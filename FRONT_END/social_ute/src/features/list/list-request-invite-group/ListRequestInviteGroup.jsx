import LoadingComponent from "combine/loading-component";
import { TYPELOADING } from "constants/type.const";
import { useAllInviteGroup } from "hook/group/useAllInviteGroup";
import React, { useEffect } from "react";
import CardInvite from "./CardInvite";

const ListRequestInviteGroup = () => {
  const { fetchAllInviteGroup, invitations } = useAllInviteGroup();

  useEffect(() => {
    fetchAllInviteGroup();
  }, [fetchAllInviteGroup]);

  return (
    <LoadingComponent type={TYPELOADING.TITLE} condition={Boolean(invitations)}>
      <div className="flex flex-col gap-2">
        {invitations?.map((invite) => {
          return (
            <CardInvite item={invite} onRefresh={() => fetchAllInviteGroup()} />
          );
        })}

        {invitations?.length === 0 && <p>Không có lời mời nào</p>}
      </div>
    </LoadingComponent>
  );
};

export default ListRequestInviteGroup;
