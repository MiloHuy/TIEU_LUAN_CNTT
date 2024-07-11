import { selectCurrenUser } from "app/slice/auth/auth.slice";
import ArrayEmpty from "combine/array-empty";
import LoadingComponent from "combine/loading-component";
import { TYPELOADING } from "constants/type.const";
import { usePostDetail } from "hook/posts/usePostDetail";
import React, { useEffect, useMemo } from "react";
import { getFullName } from "utils/user.utils";
import { motion } from "framer-motion";
import ModalPostUserV2 from "features/modal/modal-post-user/ModalPostUserV2";
import {
  containerMotion,
  itemMotion,
} from "../list-post-user-detail/MotionListPostUser";
import clsx from "clsx";
import { useAllPostsHome } from "hook/me/useAllPostsHome";

const ListPostUserHome = ({ userId, className }) => {
  const { posts, fetchPostsHome } = useAllPostsHome();

  // const user = useSelector(selectCurrenUser);
  const fullName = useMemo(
    () => getFullName(posts?.user_id?.first_name, posts?.user_id?.last_name),
    [posts]
  );

  const { postData, fetchPostDetails } = usePostDetail();

  useEffect(() => {
    fetchPostsHome(userId);
  }, [fetchPostsHome, userId]);

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
    </LoadingComponent>
  );
};

export default ListPostUserHome;
