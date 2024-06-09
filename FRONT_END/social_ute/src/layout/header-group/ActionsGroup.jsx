import { Button } from "components/button";
import { groupPermission } from "constants/group/permission.const";
import DropDownShowMoreOptionsGroup from "features/dropdown/show-more-options-group";
import ModalInviteUser from "features/modal/modal-invite-user";
import { useInviteMember } from "hook/group/useInviteMember";
import { Plus } from 'lucide-react';
import { useMemo } from "react";
import { checkPermission } from "utils/auth.utils";

const ActionsGroup = ({ permission, role, groupId }) => {
  const { handleInviteMember } = useInviteMember()

  const renderInviteButton = useMemo(() => {
    const { category, method, endPoint } = groupPermission[role].invite;
    const isValid = checkPermission(permission, category, method, endPoint);

    if (!isValid) return null;

    const url = permission[category][method][endPoint];

    return (
      <ModalInviteUser
        clsList="lg:grid-cols-1 xl:grid-cols-1"
        clsContent="max-w-xl w-[780px]"
        trigger={
          <Button className='p-2 text-lg min-w-[80px]'>
            <Plus size={20} strokeWidth={1.25} />
            Mời
          </Button>
        }
        onCallBack={(friend) => handleInviteMember({ url: url, groupId: groupId, userId: friend._id })}
      />
    )
  }, [permission, role, groupId, handleInviteMember])

  return (
    <div className='min-h-[100px] flex gap-4 items-end lg:justify-end sm:justify-start p-4'>
      {renderInviteButton}

      <Button className='p-2 text-lg min-w-[150px] text-black' color='gray'>Tham gia</Button>

      <DropDownShowMoreOptionsGroup permission={permission} />
    </div>
  )
}

export default ActionsGroup
