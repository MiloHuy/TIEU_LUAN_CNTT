import { getFullName } from "utils/user.utils";

import ArrayEmpty from 'combine/array-empty';
import LoadingComponent from "combine/loading-component";
import AvatarComponent from "components/avatar/Avatar";
import { TYPELOADING } from "constants/type.const";

const ListCommentUser = ({ comments }) => {

  return (
    <LoadingComponent type={TYPELOADING.TITLE} condition={comments.length !== 0} title='Đang lấy dữ liệu'>
      <ArrayEmpty arr={comments} title='Chưa có bình luận ở bài viết này'>
        {
          comments.map((comment) => {
            return (
              <div className="w-full flex justify-between">
                <div className="flex flex-row gap-3 items-center text-sm text-black dark:text-white font-quick_sans font-bold">
                  <AvatarComponent.Avatar>
                    <AvatarComponent.AvatarImage src={comment.user_id?.avatar?.url} />
                    <AvatarComponent.AvatarFallback>Img</AvatarComponent.AvatarFallback>
                  </AvatarComponent.Avatar>

                  <p className="hover:underline cursor-pointer">
                    {getFullName(comment.user_id?.first_name, comment.user_id?.last_name)}
                  </p>

                  <p>{comment.comment_content}</p>
                </div>
              </div>
            )
          })
        }
      </ArrayEmpty>
    </LoadingComponent>
  )
}

export default ListCommentUser