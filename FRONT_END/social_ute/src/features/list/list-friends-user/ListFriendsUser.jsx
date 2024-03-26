import ArrayEmpty from "combine/array-empty/ArrayEmpty";
import CardUserActions from "combine/card-user-actions";
import { Button } from "components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "components/dropdown";
import ModalConfirm from "features/modal/modal-confirm";
import { useUnfriend } from "hook/friends/useUnfriend";
import { MoreHorizontal } from 'lucide-react';

const ListFriendsUser = ({ friends }) => {
  const { isLoading, handleUnFriend } = useUnfriend()

  return (
    <ArrayEmpty arr={friends} title='Bạn hiện chưa có bạn bè'>
      <div div className='grid lg:grid-cols-2 gap-2 w-full h-full md:grid-cols-1' >
        {
          friends.map((friend) => {
            return (
              <CardUserActions
                userInfo={friend}
                action={
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button
                        className='w-[20px]'
                        variant="light"
                      >
                        <MoreHorizontal size={28} strokeWidth={0.75} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <ModalConfirm
                        trigger={
                          <DropdownMenuItem className='flex gap-2' onSelect={(e) => e.preventDefault()}>
                            <p className='text-md font-quick_sans font-bold gap-2'>
                              Hủy kết bạn
                            </p>
                          </DropdownMenuItem>
                        }
                        title='Bạn có chắc chắn muốn hủy kết bạn?'
                        isLoading={isLoading}

                        handleCallback={() => handleUnFriend(friend._id)}
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                }
              />
            )
          })
        }
      </div >
    </ArrayEmpty>
  )
}

export default ListFriendsUser
