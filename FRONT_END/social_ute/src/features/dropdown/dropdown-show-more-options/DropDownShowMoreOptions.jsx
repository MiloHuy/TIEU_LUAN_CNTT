import LoadingComponent from "combine/loading-component/LoadingComponent";
import { Button } from "components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "components/dropdown";
import { TYPELOADING } from "constants/type.const";
import ModalChangePrivacy from "features/modal/modal-change-privacy";
import ModalConfirm from "features/modal/modal-confirm";
import { useDeletePost } from "hook/posts/useDeletePost";
import { MoreHorizontal, SquarePen, Trash2 } from 'lucide-react';
import { getUserIdFromCookie } from "utils/user.utils";

const DropDownShowMoreOptions = ({ user_id, post_id, privacy }) => {
  const id = getUserIdFromCookie()
  const { isLoading, handleDeletePost } = useDeletePost({ post_id })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className='w-[20px] hover:bg-transparent' variant="ghost">
          <MoreHorizontal size={28} strokeWidth={0.75} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='text-sm font-quick_sans'>
        <ModalChangePrivacy
          trigger={
            <DropdownMenuItem className='flex gap-2' onSelect={(e) => e.preventDefault()}>
              <SquarePen size={18} strokeWidth={0.75} />
              <p>Đổi chế độ xem</p>
            </DropdownMenuItem>
          }
          defaultValue={privacy}
          post_id={post_id}
          title='Chọn phạm vi muốn thay đổi'
        />

        <LoadingComponent type={TYPELOADING.NULL} condition={user_id === id}>
          <ModalConfirm
            isLoading={isLoading}
            handleCallback={handleDeletePost}
            title='Xác nhận xóa bài viết của mình.'
            trigger={
              <DropdownMenuItem className='flex gap-2' onSelect={(e) => e.preventDefault()}>
                <Trash2 size={18} color="#d04e4e" strokeWidth={0.75} />
                <p>Xóa bài viết</p>
              </DropdownMenuItem>
            }
          />
        </LoadingComponent>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropDownShowMoreOptions
