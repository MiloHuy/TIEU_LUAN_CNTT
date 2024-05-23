import CardBaseLayout from "combine/card-base/CardBaseLayout";
import { Button } from "components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "components/dropdown";
import ModalConfirm from "features/modal/modal-confirm";
import { MoreHorizontal } from 'lucide-react';
import { getFullName } from "utils/user.utils";

const FriendCard = ({ friend, isLoading, handleUnFriend }) => (
  <div className="flex justify-center text-sm text-black dark:text-white">
    <CardBaseLayout
      align="vertical"
      className="w-[400px] items-center justify-between gap-4"
      header={
        <img
          src={friend.avatar.url}
          className='w-20 h-20 rounded-full object-cover'
          loading='lazy'
          alt='img'
        />
      }

      body={
        <div className="flex flex-col gap-2 h-full justify-center items-start cursor-pointer w-full">
          <p>{getFullName(friend.first_name, friend.last_name)}</p>

          <p className="uppercase">{friend.department}</p>
        </div>
      }

      footer={
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
  </div>
);

export default FriendCard