import { Button } from "components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "components/dropdown"
import { RELATIONSHIP } from "constants/user.const"
import ModalConfirm from "features/modal/modal-confirm"
import { useAccept } from "hook/friends/useAccept"
import { useAddOrCancel } from "hook/friends/useAddOrCancel"
import { useFollow } from "hook/friends/useFollow"
import { useRefused } from "hook/friends/useRefused"
import { useUnfriend } from "hook/friends/useUnfriend"
import { Check, Loader2, MailPlus, UserCheck, UserPlus, X } from 'lucide-react'
import { useMemo } from "react"

const ActionsHeaderGuest = ({ userGuestInfo }) => {
  const { friend, add_friend, following, friend_request: request_add_friend } = userGuestInfo
  const userId = userGuestInfo.user._id

  const { isLoading: loadAddOrCancel, handleAddOrCancelFriend, statusAddOrCancelFriend } = useAddOrCancel(add_friend)
  const { isLoading: loadUnfriend, handleUnfriend } = useUnfriend()
  const { isLoading: loadAccept, handleAcceptFriend } = useAccept()
  const { isLoading: loadRefused, handleRefusedFriend } = useRefused()
  const { isLoading: loadFollow, handleFollow, statusFollow } = useFollow(following)

  const buttonAction = useMemo(() => {
    const endContent = statusAddOrCancelFriend
      ? <UserCheck size={18} color="#3aa162" strokeWidth={1.5} />
      : <UserPlus size={18} strokeWidth={1} />

    switch (true) {
      case RELATIONSHIP.FRIEND === friend:
        return (
          <div className='flex gap-2 font-quick_sans'>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button className="w-max h-10 px-2 flex gap-2 items-center" variant='outline'>
                  Bạn bè
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
                  isLoading={loadUnfriend}

                  handleCallback={() => handleUnfriend(userId)}
                />
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              disabled={loadFollow}
              onClick={() => handleFollow(userId)}
              className="w-max h-10 px-2 flex gap-2 items-center"
              variant='outline'
            >
              {loadFollow ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}

              {following ? 'Đang theo dõi' : 'Theo dõi'}
            </Button>
          </div>
        )
      case RELATIONSHIP.ADD_FRIEND === add_friend:
        return (
          <div className='gap-2 flex font-quick_sans'>
            <Button
              disabled={loadAddOrCancel}
              className="w-max h-10 px-2 flex gap-2 items-center"
              onClick={() => handleAddOrCancelFriend(userId)}
              variant='outline'
            >
              {loadAddOrCancel ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              {statusAddOrCancelFriend ? "Đã gửi yêu cầu" : 'Thêm bạn bè'}
              {endContent}
            </Button>

            <Button
              disabled={loadFollow}
              onClick={() => handleFollow(userId)}
              className="w-max h-10 px-2 flex gap-2 items-center"
              variant='outline'
            >
              {loadFollow ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}

              {statusFollow ? 'Đang theo dõi' : 'Theo dõi'}
            </Button>
          </div>
        )
      case RELATIONSHIP.REQUEST_FRIEND === request_add_friend:
        return (
          <div className='gap-2 flex font-quick_sans'>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button className="w-max h-10 px-2 flex gap-2 items-center" variant='outline'>
                  Đã gửi lời mời
                  <MailPlus size={20} strokeWidth={0.75} color="#06982b" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className='text-md font-quick_sans font-bold gap-2'>
                <DropdownMenuItem
                  disabled={loadAccept}
                  onClick={() => handleAcceptFriend(userId)}
                  onSelect={(e) => e.preventDefault()}
                >
                  <p className='flex gap-2 items-center justify-between'>
                    {loadAccept ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                    Chấp nhận lời mời
                    <Check size={20} color="#06982b" strokeWidth={0.75} />
                  </p>
                </DropdownMenuItem>

                <DropdownMenuItem
                  disabled={loadRefused}
                  onClick={() => handleRefusedFriend(userId)}
                  onSelect={(e) => e.preventDefault()}
                >
                  <p className='flex gap-2 items-center justify-between'>
                    {loadRefused ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                    Từ chối lời mời
                    <X size={20} color="#e00b0b" strokeWidth={0.75} />
                  </p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              disabled={loadFollow}
              onClick={() => handleFollow(userId)}
              className="w-max h-10 px-2 flex gap-2 items-center"
              variant='outline'
            >
              {loadFollow ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}

              {statusFollow ? 'Đang theo dõi' : 'Theo dõi'}
            </Button>
          </div >
        )
      default:
        return (
          <div className='gap-2 flex font-quick_sans'>
            <Button
              disabled={loadAddOrCancel}
              className="w-max h-10 px-2 flex gap-2 items-center"
              onClick={() => handleAddOrCancelFriend(userId)}
              variant='outline'
            >
              {loadAddOrCancel ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              {statusAddOrCancelFriend ? 'Đã gửi yêu cầu' : 'Thêm bạn bè'}
              {endContent}
            </Button>

            <Button
              variant='outline'
              disabled={loadFollow}
              onClick={() => handleFollow(userId)}
              className="w-max h-10 px-2 flex gap-2 items-center"
            >
              {loadFollow ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              {statusFollow ? 'Đang theo dõi' : 'Theo dõi'}
            </Button>
          </div>
        )
    }
  }, [
    userId,
    add_friend,
    following,
    statusFollow,
    friend,
    handleAcceptFriend,
    handleAddOrCancelFriend,
    handleFollow,
    handleRefusedFriend,
    handleUnfriend,
    loadAccept,
    loadAddOrCancel,
    loadFollow,
    loadRefused,
    loadUnfriend,
    request_add_friend,
    statusAddOrCancelFriend
  ])

  return buttonAction
}

export default ActionsHeaderGuest
