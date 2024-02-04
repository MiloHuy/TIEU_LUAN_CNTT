import { useDisclosure } from "@nextui-org/react";
import { setInfoPost } from "app/slice/post/post.slice";
import ModalPostUser from "features/modal/modal-post-user";
import { motion } from "framer-motion";
import { useDispatch } from 'react-redux';
import { getPostById } from "services/post.svc";
import { container, item } from "./MotionListPostUser";

const ListPostUserDetail = (props) => {
    const { posts } = props

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const dispatch = useDispatch()

    const handleOpenPostDetails = async (post_id) => {
        onOpen()

        try {
            const postByid = await getPostById(post_id)
            dispatch(setInfoPost({ ...postByid }))
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        posts.length !== 0
            ?
            <motion.div
                className='grid grid-cols-3 gap-2 w-full h-full'
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {
                    posts.map((post) => {
                        return (
                            <motion.img
                                loading="lazy"
                                className="object-fill h-80 w-96 cursor-pointer rounded-[15px]"
                                src={post.post_img.url}
                                alt='image1'
                                onClick={() => handleOpenPostDetails(post._id)}
                                variants={item}
                            />
                        )
                    })
                }
                <ModalPostUser
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}

                />
            </motion.div >
            :
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-black dark:text-white font-nunito_sans text-md">
                    Chưa có bài viết hiện tại
                </p>
            </div>
    )
}

export default ListPostUserDetail
