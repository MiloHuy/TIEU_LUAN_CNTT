import ArrayEmpty from "combine/array-empty/ArrayEmpty";
import LoadingComponent from "combine/loading-component";
import { TYPELOADING } from "constants/type.const";
import ModalPostUserV2 from "features/modal/modal-post-user/ModalPostUserV2";
import { motion } from "framer-motion";
import { usePostDetail } from "hook/posts/usePostDetail";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getFullName } from "utils/user.utils";
import { useAllPostAdmin } from "hook/posts/useAllPostAdmin";
import { selectCurrenUser } from "app/slice/auth/auth.slice";
import { Loader2 } from "lucide-react";
import {
  containerMotion,
  itemMotion,
} from "../list-post-user-detail/MotionListPostUser";

const ListPostsAdmin = () => {
  const { posts, elementRef, hasMore, onIntersection } = useAllPostAdmin();

  const user = useSelector(selectCurrenUser);
  const userName = getFullName(user.first_name, user.last_name);

  const { postDetail, fetchPostDetails } = usePostDetail();

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

  return (
    <LoadingComponent type={TYPELOADING.TITLE} condition={Boolean(posts)}>
      <ArrayEmpty arr={posts} title="Chưa có bài viết ở hiện tại">
        <motion.div
          className="grid lg:grid-cols-3 gap-2 w-full h-full md:grid-cols-1 "
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
                      userName="AAA"
                    />
                  }
                  postDetail={postDetail}
                  userName={userName}
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

export default ListPostsAdmin;
