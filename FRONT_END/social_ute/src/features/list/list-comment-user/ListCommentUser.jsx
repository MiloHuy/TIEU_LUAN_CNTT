import { getFullName } from "utils/user.utils";

import clsx from "clsx";
import ArrayEmpty from 'combine/array-empty';
import LoadingComponent from "combine/loading-component";
import AvatarComponent from "components/avatar/Avatar";
import { TYPELOADING } from "constants/type.const";
import { useComments } from "hook/comment/useComments";
import { useEffect } from "react";

const ListCommentUser = ({ postId }) => {

  const { comments, fetchAllComments, isLoading } = useComments()

  useEffect(() => {
    if (!postId) return;

    fetchAllComments(postId)
  }, [fetchAllComments, postId])

  return (
    <LoadingComponent type={TYPELOADING.TITLE} condition={!isLoading} title='Đang lấy dữ liệu'>
      <ArrayEmpty arr={comments} title='Chưa có bình luận ở bài viết này'>
        <div className="mt-3 w-full grid items-start gap-2 h-full overflow-auto no-scrollbar">
          {
            comments.map((comment) => {
              return (
                <div className={clsx(
                  'flex flex-row gap-3 items-center w-full h-20 px-2 bg-neutral-100',
                  'text-sm text-black dark:text-white font-quick_sans font-bold',
                  ' rounded-md'
                )}>
                  <AvatarComponent.Avatar>
                    <AvatarComponent.AvatarImage src={comment.user_id?.avatar?.url} />
                    <AvatarComponent.AvatarFallback>Img</AvatarComponent.AvatarFallback>
                  </AvatarComponent.Avatar>

                  <p className="hover:underline cursor-pointer">
                    {getFullName(comment.user_id?.first_name, comment.user_id?.last_name)}
                  </p>

                  <p className='font-normal line-clamp-2 w-full '>{comment.comment_content}</p>
                </div>
              )
            })
          }
        </div>
      </ArrayEmpty>
    </LoadingComponent>
  )
}

export default ListCommentUser