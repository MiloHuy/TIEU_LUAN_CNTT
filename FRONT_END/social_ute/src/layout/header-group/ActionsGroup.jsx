import { Button } from "components/button";
import DropDownShowMoreOptionsGroup from "features/dropdown/show-more-options-group";
import { useInviteMember } from "hook/group/useInviteMember";
import { Plus } from 'lucide-react';
import { useMemo } from "react";

const ActionsGroup = ({ permission }) => {
  const { handleInviteMember, isLoading: isLoadInvite } = useInviteMember()

  const renderInviteButton = useMemo(() => {
    const { Invite } = permission

    if (!Invite) return null

    return (
      <Button
        disabled={isLoadInvite}
        className='p-2 text-lg min-w-[80px]'
        onClick={handleInviteMember}>
        <Plus size={20} strokeWidth={1.25} />
        Mời
      </Button>
    )
  }, [permission, handleInviteMember, isLoadInvite])

  return (
    <div className='min-h-[100px] flex gap-4 items-end lg:justify-end sm:justify-start p-4'>
      {renderInviteButton}

      <Button className='p-2 text-lg min-w-[150px] text-black' color='gray'>Tham gia</Button>

      <DropDownShowMoreOptionsGroup permission={permission} />
    </div>
  )
}

export default ActionsGroup
