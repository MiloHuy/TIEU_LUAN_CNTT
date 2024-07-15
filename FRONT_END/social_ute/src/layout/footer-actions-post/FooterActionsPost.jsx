import { Button } from "components/button";
import { MODEAPP } from "constants/app.const";
import ModalPostUserV2 from "features/modal/modal-post-user/ModalPostUserV2";
import { useActionsPosts } from "hook/posts/useActionsPosts";
import { usePostDetail } from "hook/posts/usePostDetail";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import cn from "utils/cn.utils";
import { CopyURL } from "utils/url.utils";
import { getModeApp } from "utils/user.utils";

const FooterActionsPost = ({
  post_id,
  hideComment = false,
  userName,
  postDescription,
  liked_post,
  number_likes,
  saved_posts,
  className,
  privacy,
}) => {
  const { numberLikes, statusPost, handleLikePost, handleSavePost } =
    useActionsPosts({ liked_post, number_likes, saved_posts });

  const { post: postData, fetchPostDetails } = usePostDetail();
  const mode = getModeApp();

  return (
    <>
      <div className={cn("flex justify-between px-1 w-full", className)}>
        <div className="flex flex-row gap-3">
          <Button
            className="w-[20px]"
            variant="ghost"
            onClick={() => handleLikePost(post_id)}
          >
            <Heart
              strokeWidth={statusPost.isLiked ? 0 : 1.5}
              absoluteStrokeWidth
              size={20}
              fill={
                statusPost.isLiked
                  ? "red"
                  : mode === MODEAPP.dark
                  ? "black"
                  : "white"
              }
            />
          </Button>

          {hideComment === true ? null : (
            <ModalPostUserV2
              privacy={privacy}
              trigger={
                <Button
                  onClick={() => fetchPostDetails(post_id)}
                  className="w-[20px]"
                  variant="ghost"
                >
                  <MessageCircle size={20} strokeWidth={1.5} />
                </Button>
              }
              userName={userName}
              postDetail={postData}
            />
          )}

          <Button
            className="w-[20px]"
            variant="ghost"
            onClick={() => CopyURL(post_id)}
          >
            <Send size={20} strokeWidth={1.5} />
          </Button>
        </div>

        <Button
          className="w-[20px]"
          variant="ghost"
          onClick={() => handleSavePost(post_id)}
        >
          <Bookmark
            size={20}
            strokeWidth={statusPost.isSaved ? 0 : 1.5}
            fill={statusPost.isSaved ? "yellow" : "white"}
          />
        </Button>
      </div>

      <div className="flex flex-col px-2 h-full text-sm text-black dark:text-white font-quick_sans w-full">
        <div className="flex-row flex gap-1">
          <h2>{numberLikes}</h2>
          <span>lượt thích</span>
        </div>

        <div className="flex w-full max-h-[30px]">
          <p className="line-clamp-3 truncate ...">
            {userName}:<span> {postDescription} </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default FooterActionsPost;
