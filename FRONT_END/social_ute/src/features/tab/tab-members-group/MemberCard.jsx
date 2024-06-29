import { selectRolePermission } from "app/slice/group/group.slice";
import CardBaseLayout from "combine/card-base/CardBaseLayout";
import { groupPermission } from "constants/group/permission.const";
import DropDownDeleteMember from "features/dropdown/dropdown-delete-member/DropDownDeleteMember";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { checkPermissionMethod } from "utils/auth.utils";
import { getFullName } from "utils/user.utils";

const MemberCard = ({ member, ...props }) => {
  const rolePermission = useSelector(selectRolePermission);
  const { permission, role } = rolePermission;
  const { groupId } = useParams();

  const renderDropdownDeleteMember = useMemo(() => {
    const isValid = checkPermissionMethod(permission, {
      action: "deleteMember",
      role: role,
    });

    if (isValid) {
      return (
        <DropDownDeleteMember
          permission={permission}
          groupId={groupId}
          memberId={member._id}
        />
      );
    }
    return <div></div>;
  }, [permission, role, groupId, member]);

  return (
    <CardBaseLayout
      align="vertical"
      className="w-[400px] justify-between items-center"
      header={
        <img
          src={member.avatar.url}
          className="w-20 h-20 rounded-full object-cover"
          loading="lazy"
          alt="img"
        />
      }
      body={
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">
            {getFullName(member.first_name, member.last_name)}
          </h3>
          <p className="text-sm text-gray-400">{member.department}</p>
        </div>
      }
      footer={renderDropdownDeleteMember}
      {...props}
    />
  );
};

export default MemberCard;
