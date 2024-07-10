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

const PostDetail = () => {
  const { postId } = useParams();

  const { fetchPostDetails, postData } = usePostDetail();

  useEffect(() => {
    fetchPostDetails(postId);
  }, [fetchPostDetails, postId]);

  const userName = getFullName(
    postData?.user_id?.first_name,
    postData?.user_id?.last_name
  );

  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
      <p className="text-2xl font-quick_sans uppercase font-bold text-start">
        Chi tiết bài viết của {userName}
      </p>
      <LoadingComponent
        type={TYPELOADING.PROPAGATE}
        condition={Boolean(postData)}
      >
        {postData && (
          <div className="max-w-[40vw] w-[40vw] p-2">
            <div
              className={clsx(
                "flex flex-col items-center gap-2 py-2 w-full overflow-hidden",
                "border border-black dark:border-white rounded-lg"
              )}
            >
              <HeaderPostUser
                className="h-16 rounded-lg w-full"
                img={postData?.user_id.avatar.url}
                name={userName}
                privacy={postData.privacy}
                action={
                  <DropdownShowMoreOptions
                    user_id={postData.userId?._id}
                    post_id={postData.id}
                    privacy={postData.privacy}
                  />
                }
              />

              <div className="w-full flex flex-col">
                <Carousel className="w-full max-h-[450px]">
                  <CarouselContent>
                    {postData?.post_img?.map((img, index) => (
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
                  post_id={postData._id}
                  postDescription={postData.description}
                  userName={userName}
                  liked_post={postData.liked}
                  number_likes={postData.likes}
                  saved_posts={postData.stored}
                />
              </div>
            </div>
          </div>
        )}
      </LoadingComponent>
    </div>
  );
};

export default PostDetail;
