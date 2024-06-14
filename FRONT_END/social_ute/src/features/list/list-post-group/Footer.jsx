import { selectRolePermission } from "app/slice/group/group.slice";
import { Button } from "components/button";
import { ShareIcon } from "components/icon/bonus.icon";
import ModalPostUserV2 from "features/modal/modal-post-user/ModalPostUserV2";
import { useActionsPostGroup } from "hook/group/useActionsPostGroup";
import { usePostDetailGroup } from "hook/group/usePostDetailGroup";
import { Bookmark, Heart, MessageCircle } from 'lucide-react';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import cn from "utils/cn.utils";

const Footer = (
  {
    post_id,
    hideComment = false,
    userName,
    postDescription,
    liked_post,
    number_likes,
    saved_posts,
    className
  }) => {

  const rolePermission = useSelector(selectRolePermission)
  const { permission, role } = rolePermission
  const { groupId } = useParams()

  const {
    statusPost,
    numberLikes,

    handleLikePostGroup,
    handleSavePostGroup,
  } = useActionsPostGroup({
    liked_post, number_likes, saved_posts, permission, role,
  })

  const { postDetail, fetchPostDetailsGroup, } = usePostDetailGroup(permission, role)

  return (
    <>
      <div className={cn('flex justify-between px-1 w-full', className)}>
        <div className='flex flex-row gap-3'>
          <Button className='w-[20px]' variant="ghost"
            onClick={() => handleLikePostGroup(post_id, groupId)}
          >
            <Heart
              strokeWidth={statusPost.isLiked ? 0 : 1.5}
              absoluteStrokeWidth
              size={20}
              fill={statusPost.isLiked ? "red" : 'white'}
            />
          </Button>

          {
            hideComment === true ? null :
              <ModalPostUserV2
                trigger={
                  <Button
                    onClick={() => fetchPostDetailsGroup(post_id, groupId)}
                    className='w-[20px]' variant="ghost">
                    <MessageCircle
                      size={20}
                      strokeWidth={1.5}
                    />
                  </Button>
                }
                groupId={groupId}
                permission={permission}
                role={role}
                userName={userName}
                postDetail={postDetail}
              />
          }

          <Button className='w-[20px]' variant="ghost">
            <ShareIcon
              height={18}
              width={18} />
          </Button>
        </div>

        <Button className='w-[20px]' variant="ghost"
          onClick={() => handleSavePostGroup(post_id)}
        >
          <Bookmark
            size={20}
            strokeWidth={statusPost.isSaved ? 0 : 1.5}
            fill={statusPost.isSaved ? "yellow" : 'white'}
          />
        </Button>
      </div>

      <div className='flex flex-col px-2 h-full text-sm text-black dark:text-white font-quick_sans w-full'>
        <div className="flex-row flex gap-1">
          <h2 >{numberLikes}</h2>
          <span>lượt thích</span>
        </div>

        <div className="flex w-full max-h-[30px]">
          <p className="line-clamp-3 truncate ...">
            {userName}:
            <span> {postDescription} </span>
          </p>
        </div>
      </div>
    </>
  )
}

export default Footer
