import { selectCurrenUser } from "app/slice/auth/auth.slice";
import ArrayEmpty from "combine/array-empty/ArrayEmpty";
import { MultipleImages } from "components/icon/bonus.icon";
import ModalPostUserV2 from "features/modal/modal-post-user/ModalPostUserV2";
import { motion } from "framer-motion";
import { usePostDetail } from "hook/posts/usePostDetail";
import { useSelector } from 'react-redux';
import { getFullName } from "utils/user.utils";
import { container, item } from "./MotionListPostUser";

const ListPostUserDetail = (props) => {
  const { posts } = props

  const user = useSelector(selectCurrenUser)
  const fullName = getFullName(user.first_name, user.last_name)

  const { postDetail, fetchPostDetails } = usePostDetail()

  return (
    <ArrayEmpty arr={posts} title='Chưa có bài viết ở hiện tại'>
      <motion.div
        className='grid lg:grid-cols-3 gap-2 w-full h-full md:grid-cols-1'
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {
          posts.map((post) => {
            return (
              <div className='relative w-full h-full'>
                <motion.div
                  className="absolute top-3 right-3"
                  variants={item}
                >
                  <MultipleImages
                    height='30'
                    width='30'
                  />
                </motion.div>

                <ModalPostUserV2
                  trigger={
                    <motion.img
                      loading="lazy"
                      className="object-fill h-80 w-96 cursor-pointer rounded-[15px]"
                      src={post.post_img.url}
                      alt='image1'
                      onClick={() => fetchPostDetails(post._id)}
                      variants={item}
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
  )
}

export default ListPostUserDetail
