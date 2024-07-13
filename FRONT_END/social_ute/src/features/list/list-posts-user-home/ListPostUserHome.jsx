import ArrayEmpty from "combine/array-empty";
import LoadingComponent from "combine/loading-component";
import { TYPELOADING } from "constants/type.const";
import { usePostDetail } from "hook/posts/usePostDetail";
import React, { useEffect } from "react";
import { getFullName } from "utils/user.utils";
import { motion } from "framer-motion";
import ModalPostUserV2 from "features/modal/modal-post-user/ModalPostUserV2";
import {
  containerMotion,
  itemMotion,
} from "../list-post-user-detail/MotionListPostUser";
import clsx from "clsx";
import { useAllPostsHome } from "hook/me/useAllPostsHome";
import { Loader2 } from "lucide-react";

const ListPostUserHome = ({ userId, className }) => {
  const { posts, onIntersection, hasMore, elementRef } =
    useAllPostsHome(userId);

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [posts, elementRef, onIntersection]);

  const { post: postData, fetchPostDetails } = usePostDetail();

  return (
    <LoadingComponent type={TYPELOADING.TITLE} condition={Boolean(posts)}>
      <ArrayEmpty arr={posts} title="Chưa có bài viết ở hiện tại">
        <motion.div
          className={clsx(
            "grid lg:grid-cols-3 gap-2 w-full h-full md:grid-cols-1",
            className
          )}
          variants={containerMotion}
          initial="hidden"
          animate="visible"
        >
          {posts?.map((post) => {
            const fullName = getFullName(
              post.user_id?.first_name,
              post.user_id?.last_name
            );
            return (
              <div className="relative w-full h-full group flex justify-center">
                <ModalPostUserV2
                  trigger={
                    <motion.img
                      loading="lazy"
                      className="object-fill h-80 w-96 cursor-pointer rounded-[15px]"
                      src={post.post_img[0].url}
                      alt="image1"
                      onClick={() => fetchPostDetails(post._id)}
                      variants={itemMotion}
                    />
                  }
                  postDetail={postData}
                  userName={fullName}
                />
              </div>
            );
          })}
        </motion.div>
      </ArrayEmpty>

      {hasMore && (
        <div
          className="flex items-center justify-center h-full"
          ref={elementRef}
        >
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        </div>
      )}
    </LoadingComponent>
  );
};

export default ListPostUserHome;
