import { Image, useDisclosure } from "@nextui-org/react";
import { setInfoPost } from "app/slice/post/post.slice";
import ModalPostUser from "features/modal/modal-post-user";
import { useDispatch } from 'react-redux';
import { getPostById } from "services/post.svc";

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
            <div className='grid grid-cols-3 gap-2 w-full h-screen'>
                {
                    posts.map((post) => {
                        return (
                            <div className="relative group w-full h-full rounded-[15px] ">
                                <Image
                                    isZoomed
                                    loading="lazy"
                                    className="object-fill h-80 w-96 opacity-10 block transition duration-500 ease-in-out hover:opacity-30 cursor-pointer"
                                    src={post.post_img.url}
                                    alt='image1'
                                    onClick={() => handleOpenPostDetails(post._id)}
                                />
                            </div>
                        )
                    }
                    )
                }
                <ModalPostUser
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}

                />
            </div >
            :
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-black dark:text-white font-mono text-md">
                    Chưa có bài viết hiện tại
                </p>
            </div>
    )
}

export default ListPostUserDetail
