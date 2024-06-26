import { selectCurrenUser } from "app/slice/auth/auth.slice";
import ArrayEmpty from "combine/array-empty/ArrayEmpty";
import LoadingComponent from "combine/loading-component";
import { TYPELOADING } from "constants/type.const";
import ModalPostUserV2 from "features/modal/modal-post-user/ModalPostUserV2";
import { motion } from "framer-motion";
import { usePostDetail } from "hook/posts/usePostDetail";
import { usePostStore } from "hook/posts/usePostStore";
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { getFullName } from "utils/user.utils";
import { containerMotion, itemMotion } from "../list-post-user-detail/MotionListPostUser";


const ListPostStored = () => {
  const { resPonseData, fetchMePostsStored } = usePostStore()

  const user = useSelector(selectCurrenUser)
  const fullName = getFullName(user.first_name, user.last_name)

  const { postDetail, fetchPostDetails } = usePostDetail()

  useEffect(() => {
    fetchMePostsStored()
  }, [fetchMePostsStored])

  return (
    <LoadingComponent type={TYPELOADING.TITLE} condition={Boolean(resPonseData)}>
      <ArrayEmpty arr={resPonseData} title='Chưa có bài viết ở hiện tại'>
        <motion.div
          className='grid lg:grid-cols-3 gap-2 w-full h-full md:grid-cols-1 '
          variants={containerMotion}
          initial="hidden"
          animate="visible"
        >
          {
            resPonseData?.map((post) => {
              return (
                <div className='relative w-full h-full group flex justify-center'>
                  <ModalPostUserV2
                    trigger={
                      <motion.img
                        loading="lazy"
                        className="object-fill h-80 w-96 cursor-pointer rounded-[15px]"
                        src={post.post_img[0].url}
                        alt='image1'
                        onClick={() => fetchPostDetails(post._id)}
                        variants={itemMotion}
                        userName='AAA'
                      />}
                    postDetail={postDetail}
                    userName={fullName}
                  />
                </div>
              )
            })
          }
        </motion.div >
      </ArrayEmpty>
    </LoadingComponent>
  )
}

export default ListPostStored
