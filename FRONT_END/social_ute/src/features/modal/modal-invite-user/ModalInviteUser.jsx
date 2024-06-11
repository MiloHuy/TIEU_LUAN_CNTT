import clsx from "clsx";
import { Button } from "components/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "components/dialog";
import ListFriendsUser from "features/list/list-friends-user";
import { useCallback } from "react";

const ModalInviteUser = ({ trigger, title, clsContent, clsList, onCallBack }) => {
  const handleInvite = useCallback(async (friend) => {
    (onCallBack) && await onCallBack(friend)
  }, [onCallBack])

  const contentsDropDown = [
    {
      title: 'Mời',
      method: handleInvite
    }
  ]

  return (
    <Dialog>
      <DialogTrigger asChild >
        {trigger ? trigger : <Button>Chọn</Button>}
      </DialogTrigger>

      <DialogContent className={clsx('min-w-[250px] h-[400px] p-2 flex flex-col overflow-auto gap-4 items-center font-quick_sans', clsContent)}>
        <DialogHeader>
          <DialogTitle>{title ? title : 'Mời vào nhóm'}</DialogTitle>
        </DialogHeader>

        <ListFriendsUser
          className={clsList}
          contentsDropDown={contentsDropDown} />
      </DialogContent>
    </Dialog>
  )
}

export default ModalInviteUser
