import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePostDetail } from "hook/posts/usePostDetail";
import clsx from "clsx";
import HeaderPostUser from "layout/header-post-user";
import { getFullName } from "utils/user.utils";
import DropdownShowMoreOptions from "features/dropdown/dropdown-show-more-options";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "components/carousel";
import FooterActionsPost from "layout/footer-actions-post";
import LoadingComponent from "combine/loading-component";
import { TYPELOADING } from "constants/type.const";
import { ERROR_POST_DETAIL } from "constants/error.const";

const PostDetail = () => {
  const { postId } = useParams();

  const { fetchPostDetails, post, code, isLoading } = usePostDetail();

  useEffect(() => {
    fetchPostDetails(postId);
  }, [fetchPostDetails, postId]);

  const userName = getFullName(
    post?.user_id?.first_name,
    post?.user_id?.last_name
  );

  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
      <p className="text-2xl font-quick_sans uppercase font-bold text-start">
        Chi tiết bài viết của {userName}
      </p>
      <LoadingComponent type={TYPELOADING.PROPAGATE} condition={isLoading}>
        {post && (
          <div className="max-w-[40vw] w-[40vw] p-2">
            <div
              className={clsx(
                "flex flex-col items-center gap-2 py-2 w-full overflow-hidden",
                "border border-black dark:border-white rounded-lg"
              )}
            >
              <HeaderPostUser
                className="h-16 rounded-lg w-full"
                img={post?.user_id.avatar.url}
                name={userName}
                privacy={post.privacy}
                createAt={post.create_post_time}
                action={
                  <DropdownShowMoreOptions
                    user_id={post.userId?._id}
                    post_id={post.id}
                    privacy={post.privacy}
                  />
                }
              />

              <div className="w-full flex flex-col">
                <Carousel className="w-full max-h-[450px]">
                  <CarouselContent>
                    {post?.post_img?.map((img, index) => (
                      <CarouselItem key={index}>
                        <img
                          lazy="loading"
                          src={img.url}
                          alt="post"
                          className="w-full h-[450px] object-fill"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>

                <FooterActionsPost
                  post_id={post._id}
                  postDescription={post.description}
                  userName={userName}
                  liked_post={post.liked}
                  number_likes={post.likes}
                  saved_posts={post.stored}
                />
              </div>
            </div>
          </div>
        )}
      </LoadingComponent>

      <LoadingComponent type={TYPELOADING.NULL} condition={Boolean(code)}>
        <p className="text-red-500">
          {code === ERROR_POST_DETAIL[0].code
            ? ERROR_POST_DETAIL[0].label
            : "Lỗi không xác định"}
        </p>
      </LoadingComponent>
    </div>
  );
};

export default PostDetail;
