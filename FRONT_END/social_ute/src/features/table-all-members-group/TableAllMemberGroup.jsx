import * as React from "react";
import { columns } from "./columns";
import { useMembers } from "hook/manage-group/useMembers";
import { DataTableV2 } from "components/data-table-v2";
import LoadingComponent from "combine/loading-component";
import { TYPELOADING } from "constants/type.const";

const TableAllMemberGroup = ({ permission, role, groupId }) => {
  const { fetchAllMembersManage, members } = useMembers();

  React.useEffect(() => {
    fetchAllMembersManage(permission, role, groupId);
  }, [fetchAllMembersManage, permission, role, groupId]);

  return (
    <LoadingComponent type={TYPELOADING.TITLE} condition={Boolean(members)}>
      <DataTableV2 columns={columns} data={members} />
    </LoadingComponent>
  );
};

export default TableAllMemberGroup;
