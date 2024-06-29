import { useSelect } from "@nextui-org/react";
import { select } from "@nextui-org/theme";
import {
  getRequestJoinGroup,
  selectIsRequest,
} from "app/slice/group/group.slice";
import { Button } from "components/button";
import { ERoleNameGroup } from "constants/group/enum";
import { groupPermission } from "constants/group/permission.const";
import DropDownShowMoreOptionsGroup from "features/dropdown/show-more-options-group";
import ModalInviteUser from "features/modal/modal-invite-user";
import { useInviteMember } from "hook/group/useInviteMember";
import { useRequestJoinGroup } from "hook/group/useRequestJoinGroup";
import { Loader2, Plus } from "lucide-react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkPermission, checkPermissionMethod } from "utils/auth.utils";
import { getUserIdFromCookie } from "utils/user.utils";

const ActionsGroup = ({ permission, role, groupId }) => {
  const { handleInviteMember } = useInviteMember();
  const { handleRequestJoinGroup, isLoading } = useRequestJoinGroup();
  const userId = getUserIdFromCookie();
  const dispatch = useDispatch();
  const isRequestJoinGroup = useSelector(selectIsRequest);

  const renderTitleButtonJoin = useMemo(() => {
    if (isRequestJoinGroup) return "Đã gửi yêu cầu";
    return "Tham gia nhóm";
  }, [isRequestJoinGroup]);

  const renderInviteButton = useMemo(() => {
    if (!groupPermission[role].invite) return null;

    const { category, method, endPoint } = groupPermission[role].invite;
    const isValid = checkPermission(permission, category, method, endPoint);

    if (!isValid) return null;

    const url = permission[category][method][endPoint];

    return (
      <ModalInviteUser
        clsList="lg:grid-cols-1 xl:grid-cols-1"
        clsContent="max-w-xl w-[780px]"
        trigger={
          <Button className="p-2 text-lg min-w-[80px]">
            <Plus size={20} strokeWidth={1.25} />
            Mời
          </Button>
        }
        onCallBack={(friend) =>
          handleInviteMember({ url: url, groupId: groupId, userId: friend._id })
        }
      />
    );
  }, [permission, role, groupId, handleInviteMember]);

  const renderButtonJoin = useMemo(() => {
    if (role !== ERoleNameGroup.GUEST)
      return (
        <Button className="p-2 text-lg min-w-[150px] text-black" color="gray">
          Đã tham gia
        </Button>
      );

    const url = checkPermissionMethod(permission, {
      action: "requestJoin",
      role: role,
    });

    if (!url) return null;

    return (
      <Button
        className="p-2 text-lg min-w-[150px] text-black"
        color="gray"
        disabled={isLoading}
        onClick={() => {
          handleRequestJoinGroup({
            url: url,
            groupId: groupId,
            userId: userId,
          });
          dispatch(getRequestJoinGroup(!isRequestJoinGroup));
        }}
      >
        {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
        {renderTitleButtonJoin}
      </Button>
    );
  }, [
    permission,
    role,
    groupId,
    handleRequestJoinGroup,
    isLoading,
    userId,
    renderTitleButtonJoin,
    dispatch,
    isRequestJoinGroup,
  ]);

  return (
    <div className="min-h-[100px] flex gap-4 items-end lg:justify-end sm:justify-start p-4">
      {renderInviteButton}

      {renderButtonJoin}

      <DropDownShowMoreOptionsGroup permission={permission} role={role} />
    </div>
  );
};

export default ActionsGroup;
